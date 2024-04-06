import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { BaseResponse } from '../common/responses/base.response'
import { Paging } from '../common/responses/paging'
import { ProductService } from './product.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadProductImagePipe } from '../common/transform/upload-image.pipe'

@Controller({
    version: '1',
    path: 'product',
})
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOkResponse({
        description: 'Get All seller product',
        isArray: true,
    })
    @ApiOperation({ summary: 'Get properties by host' })
    async getProperties(@Query() queries: any): Promise<any> {
        const { data, count } = await this.productService.getAllProduct(queries)
        return BaseResponse.ok(data, Paging.build(+queries.page, +queries.pageSize, count))
    }

    @Get('/:id')
    @ApiOkResponse({ description: 'Get detail product' })
    @ApiOperation({ summary: 'Get detail product' })
    async getProduct(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return BaseResponse.ok(await this.productService.getProduct(id))
    }

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: '' })
    async uploadPropertyImage(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile(UploadProductImagePipe)
        image: Express.Multer.File,
    ): Promise<any> {
        return BaseResponse.ok(await this.productService.uploadImage(id, image))
    }

    @Post('')
    @ApiOperation({ summary: '' })
    async createProduct(@Body() body: any): Promise<any> {
        return BaseResponse.ok(await this.productService.create(body))
    }

    @Post('/:id')
    @ApiOperation({ summary: '' })
    async update(@Body() body: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return BaseResponse.ok(await this.productService.update(id, body))
    }
}
