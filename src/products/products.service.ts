import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async createProduct(dto: CreateProductDto) {
        const { characteristics, categoryId, ...otherDto } = dto;

        const candidateCharacteristics =
            await this.prisma.characteristics.create({
                data: characteristics,
            });

        if (!candidateCharacteristics) {
            throw new HttpException(
                'Ошибка при создании хар-ик',
                HttpStatus.BAD_REQUEST,
            );
        }

        const product = await this.prisma.product.create({
            data: {
                ...otherDto,
                characteristics: {
                    connect: { id: candidateCharacteristics.id },
                },
                category: {
                    connect: { id: categoryId },
                },
            },
        });

        return product;
    }

    async getAllProduct(slug: string) {
        if (!slug.length) {
            const products = await this.prisma.product.findMany();
            return products;
        } else {
            const category = await this.prisma.categories.findFirst({
                where: {
                    slug: slug,
                },
            });

            if (!category) {
                throw new HttpException(
                    'Ошибка при поиска категории',
                    HttpStatus.NOT_FOUND,
                );
            }

            const products = await this.prisma.product.findMany({
                where: {
                    categoryId: category.id,
                },
            });

            return products;
        }
    }

    async getOneProduct(slug: string) {
        const product = await this.prisma.product.findFirst({
            where: {
                slug: slug,
            },
            include: {
                category: true,
                characteristics: true,
            },
        });

        return product;
    }
}
