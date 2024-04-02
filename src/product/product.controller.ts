import { Controller, Get, Param, ParseIntPipe, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { BaseResponse } from '@src/common/responses/base.response'
import { UserPayload } from '@src/auth/user.payload'
import { AuthUser } from '@src//common/decorators/auth-user.decorator'
import { Paging } from '@src/common/responses/paging'
import { JwtHostOrReadGuard } from '@src/auth/guards/jwt-host-or-read.guard'
import { ProductService } from '@src/product/product.service'

@Controller({
    version: '1',
    path: 'product',
})
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/seller')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(JwtHostOrReadGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Get All host properties',
        isArray: true,
    })
    @ApiOperation({ summary: 'Get properties by host' })
    async getHostProperties(@AuthUser() user: UserPayload, @Query() queries): Promise<any> {
        queries.userId = user.id
        const { data, count } = await this.productService.getAllProduct(queries)
        return BaseResponse.ok(data, Paging.build(+queries.page, +queries.pageSize, count))
    }

    @Get('/:id')
    @ApiOkResponse({ description: 'Get detail product' })
    @ApiOperation({ summary: 'Get detail product' })
    async getproduct(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return BaseResponse.ok(await this.productService.getProduct(id))
    }
}
