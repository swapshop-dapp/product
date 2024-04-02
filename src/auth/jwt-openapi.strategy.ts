import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { UserPayload } from './user.payload'

@Injectable()
export default class JwtOpenapiStrategy extends PassportStrategy(Strategy, 'jwt-openapi') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(userPayload: Record<string, any>): UserPayload {
        const scopes = userPayload.scopes
        if (scopes && Array.isArray(scopes) && scopes.includes('openapi')) return plainToClass(UserPayload, userPayload)
        if (scopes && Array.isArray(scopes) && scopes.includes('read_host_data'))
            throw new UnauthorizedException('You cannot perform this action in view-only mode.')
        throw new UnauthorizedException()
    }
}
