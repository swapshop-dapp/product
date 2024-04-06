import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { PrismaModule } from '../common/connections/prisma.module'
import { HttpModule } from '@nestjs/axios'
import { HttpclientModule } from '../shares/httpclient/httpclient.module'
import { ProductController } from './product.controller'

@Module({
    imports: [
        PrismaModule,
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
