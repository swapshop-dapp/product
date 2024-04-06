import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BaseClientService } from './baseclient.service'
import { SupportCryptoCurrencyEnum, SupportFiatCurrencyEnum } from '../../constants/currency'

@Injectable()
export default class PaygateClientService extends BaseClientService {
    constructor(private readonly config: ConfigService) {
        super(config.get('paygateService'))
        this.httpClient.defaults.headers.common['x-api-key'] = config.get<string>('internalApiKey')
        this.httpClient.defaults.headers.common['user-agent'] = config.get('INTERNAL_USER_AGENT')
    }

    async getExchangeRates(
        dto: { listingCurrency: string; targets?: string[] } = { targets: [], listingCurrency: 'usd' },
    ): Promise<Record<string, number>> {
        dto.listingCurrency = dto.listingCurrency.toLowerCase()
        try {
            const response = await this.httpClient.get(`/currency/convert`, {
                params: {
                    base: dto.listingCurrency,
                    value: 1,
                    targets: [...Object.values(SupportFiatCurrencyEnum), ...Object.values(SupportCryptoCurrencyEnum)]
                        .concat(dto.targets)
                        .join(',')
                        .toLowerCase(),
                },
            })
            return response.data?.data
        } catch (e) {
            throw new BadRequestException(`Convert currency error: ${e.message}`)
        }
    }

    async getPaymentMethod(userId: string) {
        try {
            const { data } = await this.httpClient.get(`/payment/internal/methods/${userId}`)
            return data?.data
        } catch (e) {
            console.log(e)
            return {
                FIAT: false,
                CRYPTO: false,
            }
        }
    }

    async convertedPrice(price: number, baseCurrency: string, targetCurrency = 'USD'): Promise<number> {
        try {
            const response = await this.httpClient.get('/currency/convert', {
                params: { base: baseCurrency, targets: targetCurrency, value: price },
            })
            return response?.data?.data[targetCurrency] ?? 0
        } catch (e) {
            throw e
        }
    }

    async currency(): Promise<any> {
        try {
            const response = await this.httpClient.get('/currency/support')
            return response?.data?.data
        } catch (e) {
            throw e
        }
    }
}
