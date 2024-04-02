import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BaseClientService } from './baseclient.service'

@Injectable()
export default class EmailclientService extends BaseClientService {
    constructor(private readonly config: ConfigService) {
        super(config.get('emailService'))
        this.httpClient.defaults.headers.common['x-api-key'] = config.get<string>('internalApiKey')
        this.httpClient.defaults.headers.common['user-agent'] = config.get('INTERNAL_USER_AGENT')
    }
}
