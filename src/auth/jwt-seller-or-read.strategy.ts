import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { UserPayload } from './user.payload'

@Injectable()
export default class JwtSellerOrReadStrategy extends PassportStrategy(Strategy, 'jwt-seller-or-read') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(userPayload: Record<string, any>): UserPayload {
        const scopes = userPayload.scopes
        if ((scopes && Array.isArray(scopes) && scopes.includes('read_seller_data')) || scopes.includes('seller'))
            return plainToClass(UserPayload, userPayload)
        throw new UnauthorizedException()
    }
}
