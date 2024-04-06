import { Module } from '@nestjs/common'
import { ProductService } from '../product/product.service'
import { HttpModule } from '@nestjs/axios'
import { HttpclientModule } from '../shares/httpclient/httpclient.module'
import { ProductController } from '../product/product.controller'

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 60000,
            }),
        }),
        HttpclientModule,
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
