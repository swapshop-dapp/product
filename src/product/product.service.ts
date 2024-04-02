import { Injectable } from '@nestjs/common'
import { SearchDto } from '@src/product/dto/search.dto'

@Injectable()
export class ProductService {
    constructor() {}

    async getProduct(id: number): Promise<any> {}

    async getAllProduct(queries: SearchDto): Promise<any> {}
}
