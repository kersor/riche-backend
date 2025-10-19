export class CreateProductDto {
    name: string;
    slug: string;
    image: string;
    price: number;
    description: string;
    fullDescription: string;
    skinType?: string;
    fragrance?: string;
    age?: number;
    ph?: string;
    shelfLife?: object;
    volume?: string;
}
