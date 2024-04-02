import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { ProductService } from './product.service'
import { KafkaModule } from '../kafka/kafka.module'
import { PrismaModule } from '../common/connections/prisma.module'
import { HttpModule } from '@nestjs/axios'
import { SlackModule } from '../slack/slack.module'
import { RedisModule } from '../redis/redis.module'
import { HttpclientModule } from '../shares/httpclient/httpclient.module'
import { ProductController } from './product.controller'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
                ttl: 300,
            }),
        }),
        KafkaModule,
        PrismaModule,
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 60000,
            }),
        }),
        SlackModule,
        RedisModule,
        HttpclientModule,
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
