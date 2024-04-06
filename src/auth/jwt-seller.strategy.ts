import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserPayload } from './user.payload'

@Injectable()
export default class JwtSellerStrategy extends PassportStrategy(Strategy, 'jwt-seller') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(userPayload: Record<string, any>): UserPayload {
        const scopes = userPayload.scopes
        if (scopes && Array.isArray(scopes) && scopes.includes('seller')) return <UserPayload>userPayload
        if (scopes && Array.isArray(scopes) && scopes.includes('read_seller_data'))
            throw new UnauthorizedException('You cannot perform this action in view-only mode.')
        throw new UnauthorizedException()
    }
}
