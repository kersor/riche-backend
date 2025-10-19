import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.productsService.createProduct(dto);
    }

    @Get(':slug')
    getAllSlugProduct(@Param('slug') slug: string) {
        return this.productsService.getAllProduct(slug);
    }

    @Get()
    getAllProduct() {
        return this.productsService.getAllProduct('');
    }

    @Get('/p/:slug')
    getOneProduct(@Param('slug') slug: string) {
        return this.productsService.getOneProduct(slug);
    }
}
