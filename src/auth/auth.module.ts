import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import InternalStrategy from './internal.strategy'
import JwtSellerStrategy from './jwt-seller.strategy'
import JwtSellerOrReadStrategy from './jwt-seller-or-read.strategy'

@Module({
    controllers: [],
    providers: [InternalStrategy, JwtSellerStrategy, JwtSellerOrReadStrategy],
    imports: [PassportModule, ConfigModule],
})
export class AuthModule {}
