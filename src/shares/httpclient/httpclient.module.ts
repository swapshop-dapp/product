import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import PaygateClientService from './paygateclient.service'
import AccountClientService from './accountclient.service'
import { CacheModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [],
    providers: [PaygateClientService, AccountClientService],
    exports: [PaygateClientService, AccountClientService],
})
export class HttpclientModule {}
