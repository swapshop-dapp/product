import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from '../constants/const'

export type RedisClient = Redis

export const redisProviders: Provider[] = [
    {
        useFactory: (configService: ConfigService): RedisClient => {
            return new Redis({
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
            })
        },
        inject: [ConfigService],
        provide: REDIS_SUBSCRIBER_CLIENT,
    },
    {
        useFactory: (configService: ConfigService): RedisClient => {
            return new Redis({
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
            })
        },
        inject: [ConfigService],
        provide: REDIS_PUBLISHER_CLIENT,
    },
]
