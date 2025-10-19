import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    getFunc() {
        return {
            title: 123,
        };
    }
}
