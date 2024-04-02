import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import InternalStrategy from './internal.strategy'
import JWTHostStrategy from './jwt-host.strategy'
import JwtOpenapiStrategy from './jwt-openapi.strategy'
import JwtHostOrReadStrategy from './jwt-host-or-read.strategy'

@Module({
    controllers: [],
    providers: [InternalStrategy, JWTHostStrategy, JwtOpenapiStrategy, JwtHostOrReadStrategy],
    imports: [PassportModule, ConfigModule],
})
export class AuthModule {}
