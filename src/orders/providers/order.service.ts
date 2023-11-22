import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderRequest } from '../requests/create-order-request';
import { Order } from '../entities/order.entity';
import { UpdateOrderRequest } from '../requests/update-order-request';
import { OrderResponse } from '../responses/order.response';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Tài liệu: https://docs.nestjs.com/providers#services
@Injectable()
export class OrdersService {
  private static orders: Array<Order> = [];

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async search(
    keyword?: string,
    page?: number,
    limit?: number,
  ): Promise<[Order[], number]> {
    return await this.orderRepository.findAndCount({
      relations: {},
      where: {
        note: ILike(`%${keyword || ''}%`),
      },
      order: { id: 'DESC' }, // ORDER BY
      take: 5, // Tương đương LIMIT
      skip: 0, // Tương đương OFFSET
    });
  }

  async create(createOrder: CreateOrderRequest): Promise<void> {
    const order: Order = new Order();
    order.serialNumber = createOrder.serialNumber;
    order.userId = createOrder.userId;
    order.orderAt = createOrder.orderAt;
    order.totalPrice = createOrder.totalPrice;
    order.status = createOrder.status;
    order.note = createOrder.note;
    // TODO: mã hóa

    await this.orderRepository.save(order);
  }

  async find(id: number): Promise<OrderResponse> {
    const order: Order = await this.orderRepository.findOneBy({ id });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!order) {
      throw new NotFoundException();
    }

    return new OrderResponse(order);
  }

  async update(
    id: number,
    orderUpdate: UpdateOrderRequest,
  ): Promise<OrderResponse> {
    const order: Order = await this.orderRepository.findOneBy({ id });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!order) {
      throw new NotFoundException();
    }

    await this.orderRepository.update({ id: id }, orderUpdate);

    return await this.find(id);
  }

  async delete(id: number): Promise<void> {
    const order: Order = await this.orderRepository.findOneBy({ id });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!order) {
      throw new NotFoundException();
    }

    this.orderRepository.softRemove({ id });
  }
}
