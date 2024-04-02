import Strategy from 'passport-headerapikey'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class InternalStrategy extends PassportStrategy(Strategy, 'internal') {
    constructor(private configService: ConfigService) {
        super({ header: 'x-api-key', prefix: '' }, true, (apiKey, done) => {
            if (this.configService.get<string>('INTERNAL_API_KEY') === apiKey) {
                done(null, true)
            }
            done(new UnauthorizedException(), null)
        })
    }
}
