import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BaseClientService } from './baseclient.service'
import { SuperHogCreateListingDto, SuperHogUpdateListing } from '../../property/dto/superHog-create-listing.dto'

@Injectable()
export default class SuperhogclientService extends BaseClientService {
    constructor(private readonly config: ConfigService) {
        super(config.get('superHogUrl'))
    }

    async createListing(body: SuperHogCreateListingDto, token: string): Promise<any> {
        try {
            const { data } = await this.httpClient.post(`/platform/listings`, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'Ocp-Apim-Subscription-Key': this.config.get('SubscriptionKey'),
                    'x-environment': this.config.get('superHogEnv'),
                },
            })
            return data?.id
        } catch (e) {
            // console.log(JSON.stringify(e))
            throw e
        }
    }

    async updateListing(body: SuperHogUpdateListing, token: string, listingId: number): Promise<any> {
        try {
            await this.httpClient.put(`/platform/listings/${listingId}`, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'Ocp-Apim-Subscription-Key': this.config.get('SubscriptionKey'),
                    'x-environment': this.config.get('superHogEnv'),
                },
            })
        } catch (e) {
            // console.log(JSON.stringify(e))
            throw e
        }
    }

    async getListing(listingId: string, token: string): Promise<any> {
        try {
            const { data } = await this.httpClient.get(`/platform/listings/${listingId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'Ocp-Apim-Subscription-Key': this.config.get('SubscriptionKey'),
                    'x-environment': this.config.get('superHogEnv'),
                },
            })
            return data
        } catch (e) {
            // console.log(JSON.stringify(e))
            throw e
        }
    }
}
