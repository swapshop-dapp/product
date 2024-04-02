import { Injectable }        from '@nestjs/common'
import { ConfigService }     from '@nestjs/config'
import { BaseClientService } from './baseclient.service'
import { plainToInstance }   from 'class-transformer'

@Injectable()
export default class ReservationClientService extends BaseClientService {
    constructor(private readonly config: ConfigService) {
        super(config.get('reservationService'))
        this.httpClient.defaults.headers.common['x-api-key'] = config.get<string>('internalApiKey')
        this.httpClient.defaults.headers.common['user-agent'] = config.get('INTERNAL_USER_AGENT')
    }
    
    async manualReservation(reservationId: string): Promise<any> {
        try {
            const response = await this.httpClient.get(`/reservation/public/${reservationId}`, {})
            return response?.data?.data
        } catch (e) {
            throw e
        }
    }
    
    async getReservations(params: { startDate: string; endDate: string; listingId: number }): Promise<any> {
        try {
            const response = await this.httpClient.get(`/reservation/internal/`, {
                params,
            })
            return response?.data?.data
        } catch (e) {
            throw e
        }
    }
    
    async getPromotionCode(params: { hostId: string; promoCode: string }) {
        try {
            const response = await this.httpClient.get(
                `promotion/internal/${params.hostId}/${params.promoCode}/available`,
            )
            return plainToInstance(PromotionCode, response?.data?.data)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
