import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { HealthModule } from './health/health.module'
// import { PrismaModule } from './/common/connections/prisma.module'
import configuration from '../config/configuration'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${process.cwd()}/config/env/${process.env.ENV || 'local'}.env`, '.env'],
            expandVariables: true,
            load: [configuration],
            isGlobal: true,
        }),
        // PrismaModule,
        TerminusModule,
        HealthModule,
        AuthModule,
        ProductModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
