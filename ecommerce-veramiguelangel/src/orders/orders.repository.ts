import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/OrderDetails/entities/ordersDetails.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetail)
    private ordersDeatils: Repository<OrderDetail>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addOrder(userId: string, productId: string): Promise<Orders[]> {
    // Verifico que exista el usuario
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(`Usuario con id: ${userId} no encontrado`);

    // Creo la orden
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ordersRepository.save(order);

    // Busco el producto
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product)
      throw new NotFoundException(
        `Producto con id: ${productId} no encontrado`,
      );

    // Actualizo stock (siempre se descuenta 1)
    await this.productRepository.update(
      { id: productId },
      { stock: product.stock - 1 },
    );

    // Calculo el total (solo un producto)
    const total = Number(product.price);

    // Creo orderDetail
    const orderDetail = new OrderDetail();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = [product]; // sigue siendo array en la relación
    orderDetail.order = newOrder;
    await this.ordersDeatils.save(orderDetail);

    // Devuelvo la orden con detalle
    return await this.ordersRepository.find({
      where: { id: order.id },
      relations: { orderDetail: { products: true } },
    });
  }

  async getOrder(id: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });

    if (!order)
      throw new NotFoundException(`Orden con id: ${id} no encontrada`);
    return order;
  }
}
