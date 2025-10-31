import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueService } from '../queue/queue.service';

@Module({
  controllers: [OrdersController],
  providers: [PrismaService, RedisService, QueueService, OrdersService],
})
export class OrdersModule {}