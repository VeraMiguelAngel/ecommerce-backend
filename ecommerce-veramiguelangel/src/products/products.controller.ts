import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Product } from './entities/products.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @ApiOperation({ summary: 'Obtiene una lista de productos con paginación' })
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.productsService.getProducts(Number(page), Number(limit));
    return this.productsService.getProducts(Number(1), Number(5));
  }

  @ApiBearerAuth()
  @Get('seeder')
  @ApiOperation({ summary: 'Añade productos de prueba a la base de datos' })
  addProducts() {
    return this.productsService.addProduct();
  }

  @ApiOperation({ summary: 'Obtiene un producto por su ID' })
  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  createProduct(@Body() product: Omit<Product, 'íd'>) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualiza un producto por su ID' })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Product,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Elimina un producto por su ID' })
  @ApiBearerAuth()
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
