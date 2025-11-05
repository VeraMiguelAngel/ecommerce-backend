import { Injectable } from '@nestjs/common';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

const products: Product[] = [
  {
    id: '1',
    name: 'Guitarra Criolla',
    description: 'Acústica de madera',
    price: 45000,
    stock: true,
    imgUrl: 'https://example.com/images/guitarra-criolla.jpg',
  },
  {
    id: '2',
    name: 'Teclado Yamaha PSR-E373',
    description: 'Digital de 61 teclas',
    price: 120000,
    stock: true,
    imgUrl: 'https://example.com/images/teclado-yamaha.jpg',
  },
  {
    id: '3',
    name: 'Batería Alesis Nitro',
    description: 'Electrónica con pads',
    price: 280000,
    stock: false,
    imgUrl: 'https://example.com/images/bateria-electronica.jpg',
  },
  {
    id: '4',
    name: 'Violín Stentor 4/4',
    description: 'Para estudiantes',
    price: 95000,
    stock: true,
    imgUrl: 'https://example.com/images/violin-stentor.jpg',
  },
  {
    id: '5',
    name: 'Ukelele Mahalo',
    description: 'Compacto y alegre',
    price: 25000,
    stock: true,
    imgUrl: 'https://example.com/images/ukelele-mahalo.jpg',
  },
  {
    id: '6',
    name: 'Flauta Yamaha YRS-23',
    description: 'Soprano escolar',
    price: 8000,
    stock: true,
    imgUrl: 'https://example.com/images/flauta-yamaha.jpg',
  },
  {
    id: '7',
    name: 'Saxofón Jean Paul AS-400',
    description: 'Alto profesional',
    price: 350000,
    stock: false,
    imgUrl: 'https://example.com/images/saxofon-jeanpaul.jpg',
  },
  {
    id: '8',
    name: 'Cajón Meinl',
    description: 'Percusión acústica',
    price: 42000,
    stock: true,
    imgUrl: 'https://example.com/images/cajon-meinl.jpg',
  },
  {
    id: '9',
    name: 'Armónica Hohner',
    description: 'Diatónica en C',
    price: 15000,
    stock: true,
    imgUrl: 'https://example.com/images/armonica-hohner.jpg',
  },
  {
    id: '10',
    name: 'Pandereta Remo',
    description: 'Con sonajas metálicas',
    price: 18000,
    stock: true,
    imgUrl: 'https://example.com/images/pandereta-remo.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  getProducts(page: number, limit: number): Product[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    const productList = products.slice(start, end);
    return productList.map((product) => product);
  }

  getProduct(id: string) {
    const foundProduct = products.find((product) => product.id === id);
    if (!foundProduct) return `No se encontró el producto con id: ${id}`;
    return foundProduct;
  }

  addProduct(product: Product) {
    products.push({ ...product, id: product.name });
    return product.name;
  }

  updateProduct(id: string, productNewdata: any): string {
    const foundProduct = products.find((product) => product.id === id);
    if (!foundProduct) return `No se encontró el producto con id: ${id}`;
    Object.assign(foundProduct, productNewdata);
    return id;
  }

  deleteProduct(id: string): string {
    const foundIndex = products.findIndex((product) => product.id === id); //* index || -1
    if (foundIndex === -1) return `No se encontró el producto con id: ${id}`;
    products.splice(foundIndex, 1);
    return id;
  }
}
