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

  async addOrder(userId: string, products: Product[]): Promise<Orders[]> {
    //verifico que exista el usuario
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(`Usuario con id: ${userId} no encontrado`);
    //creo la orden:
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    // asocio cada id recibido con su producto:
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });
        if (!product)
          throw new Error(`Producto con id: ${element.id} no encontrado`);

        //actualizo el stock:
        await this.productRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    // calculo el total:
    const total = productsArray.reduce(
      (sum, product: Product) => sum + Number(product.price),
      0,
    );

    //creo orderDetail y la iserto en la bdd:
    const orderDetail = new OrderDetail();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.ordersDeatils.save(orderDetail);

    //envío al cliente la compra con los datos de los productos:
    return await this.ordersRepository.find({
      where: { id: order.id },
      relations: { orderDetail: true },
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
