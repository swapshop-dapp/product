import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { UserPayload } from './user.payload'

@Injectable()
export default class JwtHostOrReadStrategy extends PassportStrategy(Strategy, 'jwt-host-or-read') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(userPayload: Record<string, any>): UserPayload {
        const scopes = userPayload.scopes
        if ((scopes && Array.isArray(scopes) && scopes.includes('read_host_data')) || scopes.includes('host'))
            return plainToClass(UserPayload, userPayload)
        throw new UnauthorizedException()
    }
}
