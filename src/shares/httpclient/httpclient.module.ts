import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import IntegrationClientService from './integrationclient.service'
import PaygateClientService from './paygateclient.service'
import AccountClientService from './accountclient.service'
import ReservationClientService from './reservationclient.service'
import SuperhogclientService from './superhogclient.service'
import EmailclientService from './emailclient.service'
import { CacheModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'

@Module({
    imports: [
        ConfigModule,
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
    ],
    controllers: [],
    providers: [
        IntegrationClientService,
        PaygateClientService,
        AccountClientService,
        ReservationClientService,
        SuperhogclientService,
        EmailclientService,
    ],
    exports: [
        IntegrationClientService,
        PaygateClientService,
        AccountClientService,
        ReservationClientService,
        SuperhogclientService,
        EmailclientService,
    ],
})
export class HttpclientModule {}
