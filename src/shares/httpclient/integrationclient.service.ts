import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BaseClientService } from './baseclient.service'

@Injectable()
export default class IntegrationClientService extends BaseClientService {
    constructor(private readonly config: ConfigService) {
        super(config.get('integrationService'))
        this.httpClient.defaults.headers.common['x-api-key'] = config.get<string>('internalApiKey')
        this.httpClient.defaults.headers.common['user-agent'] = config.get('INTERNAL_USER_AGENT')
    }

    async calendars(dto) {
        const response = await this.get(`/calendar/${dto.type}`, {
            params: {
                startDate: dto.startDate,
                hostAddress: dto.hostAddress,
                endDate: dto.endDate,
                listingId: dto.listingId,
            },
        })
        return response.data
    }

    async price(dto) {
        const response = await this.get(`/calendar/price/${dto.type}`, {
            params: {
                startDate: dto.checkinDate,
                hostAddress: dto.walletId,
                endDate: dto.checkoutDate,
                listingId: dto.listingId,
                numberOfGuests: dto.guestCount,
                currency: dto.currency,
                listingCurrency: dto.listingCurrency,
                nights: dto.nights,
            },
        })
        return response.data
    }
}
