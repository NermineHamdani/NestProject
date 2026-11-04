import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products: Product[] = []; 
  create(createProductDto: CreateProductDto) {
    const product: Product = {
      id: this.products.length + 1,
      ...createProductDto
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    Object.assign(product, updateProductDto);
    return {
      status: 200,
      message: 'Product updated successfully',
      data: this.products
    };
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(productIndex, 1);
    return {
      status: 200,
      message: 'Product deleted successfully',
      data: this.products
    };  
    
  }
}
