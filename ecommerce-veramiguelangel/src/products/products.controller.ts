import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  // Post,
  // Put,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.productsService.getProducts(Number(page), Number(limit));
    return this.productsService.getProducts(Number(1), Number(5));
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProduct();
  }

  // @Get(':id')
  // getProduct(@Param('id') id: string) {
  //   return this.productsService.getProduct(id);
  // }

  // @Post()
  // @UseGuards(AuthGuard)
  // addProduct(@Body() product: any) {
  //   return this.productsService.addProduct(product);
  // }

  // @Put(':id')
  // @UseGuards(AuthGuard)
  // updateProduct(@Param('id') id: string, @Body() product: any) {
  //   return this.productsService.updateProduct(id, product);
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // deleteProduct(@Param('id') id: string) {
  //   return this.productsService.deleteProduct(id);
  // }
}
