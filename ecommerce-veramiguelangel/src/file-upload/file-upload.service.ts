import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product)
      throw new NotFoundException(
        `Producto con id: ${productId} no encontrado`,
      );
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url)
      throw new NotFoundException(`Error al cargar la imágen a Cloudinary`);

    await this.productsRepository.update(productId, {
      imgUrl: response.secure_url,
    });
    const updateProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return updateProduct;
  }
}
