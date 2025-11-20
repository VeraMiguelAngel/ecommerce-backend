import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/categories.entity';
import { Product } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private producRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.producRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.producRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`No se encontró el producto con id: ${id}`);
    return product;
  }

  async addProduct(): Promise<string> {
    //verificamos que exista la categoría
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category)
          throw new NotFoundException(
            'La categoría ${element.category} no existe',
          );
        //creamos un nuevo producto
        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;
        //grabamos el nuevo producto
        await this.producRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          // si el prodcuto existe, lo actializamos
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Producto Agregado';
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    await this.producRepository.update(id, product);
    const updatedProduct = await this.producRepository.findOneBy({
      id,
    });
    if (!updatedProduct)
      throw new NotFoundException(`No se encontró el producto con id: ${id}`);
    return updatedProduct;
  }

  // deleteProduct(id: string): string {
  //   const foundIndex = products.findIndex((product) => product.id === id); //* index || -1
  //   if (foundIndex === -1) return `No se encontró el producto con id: ${id}`;
  //   products.splice(foundIndex, 1);
  //   return id;
  // }
}
