import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QueueService {
  constructor(private prisma: PrismaService) {}

  @OnEvent('order.created')
  async handleOrderCreated(order: any) {
    // Simulate async order processing
    console.log(`Processing order ${order.id}...`);
    
    // Simulate delay (like SQS processing)
    setTimeout(async () => {
      try {
        await this.prisma.order.update({
          where: { id: order.id },
          data: { status: 'CONFIRMED' },
        });
        console.log(`Order ${order.id} confirmed`);
      } catch (error) {
        console.error(`Failed to confirm order ${order.id}:`, error);
      }
    }, 2000); // 2 second delay
  }
}