import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/order.controller';
import { OrdersService } from './providers/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
