import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    async createCategory(dto: CreateCategoryDto) {
        const category = await this.prisma.categories.create({
            data: dto,
        });

        return category;
    }

    async getAllCategories() {
        const category = await this.prisma.categories.findMany();

        return category;
    }
}
