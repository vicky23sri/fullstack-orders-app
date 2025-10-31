import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      // Calculate total
      let total = 0;
      const orderItems: { productId: number; quantity: number; price: number; }[] = [];

      for (const item of createOrderDto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product with id ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        const itemTotal = Number(product.price) * item.quantity;
        total += itemTotal;

        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: Number(product.price),
        });

        // Update stock
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Create order
      const order = await tx.order.create({
        data: {
          userId: createOrderDto.userId,
          total,
          orderItems: {
            create: orderItems,
          },
        },
        include: {
          user: true,
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      // Clear cache
      await this.redis.flushPattern('orders:*');

      // Emit event for queue processing
      this.eventEmitter.emit('order.created', order);

      return order;
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async getOrders(query: OrderQueryDto) {
    const cacheKey = `orders:${JSON.stringify(query)}`;
    const cached = await this.redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const { page=1, limit=10, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = search
      ? {
          OR: [
            {
              user: {
                name: {
                  contains: search,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
            },
            {
              user: {
                email: {
                  contains: search,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
            },
          ],
        }
      : {};

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          user: true,
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    const result = {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    // Cache for 30 seconds
    await this.redis.set(cacheKey, JSON.stringify(result), 30);

    return result;
  }
}
