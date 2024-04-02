import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BaseClientService } from './baseclient.service'

@Injectable()
export default class AccountClientService extends BaseClientService {
    constructor(private readonly config: ConfigService) {
        super(config.get('accountService'))
        this.httpClient.defaults.headers.common['x-api-key'] = config.get<string>('internalApiKey')
        this.httpClient.defaults.headers.common['user-agent'] = config.get('INTERNAL_USER_AGENT')
    }

    async getUser(userId: string): Promise<any> {
        const { data } = await this.httpClient.get(`/v1/user/get-user-profile/${userId}`)
        return data?.data
    }

    async getListUserTesting() {
        try {
            const { data } = await this.httpClient.get(`/v1/user/get-user-testing`)
            return data?.data
        } catch (e) {
            console.log(e)
        }
    }

    async getListUserUsedActive() {
        try {
            const { data } = await this.httpClient.get(`/v1/user/get-user-used-active`)
            return data?.data
        } catch (e) {
            console.log(e)
        }
    }

    async getHostAccount(hostId: string): Promise<any> {
        const { data } = await this.httpClient.get(`/v1/user/profile/${hostId}`)
        return data?.data
    }
}
