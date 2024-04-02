import { CONTRACT_DEPLOY_STATUS } from '../constants/const'

export class PropertyStatusUtils {
    static generateStatusForNewProperty(dataPayment) {
        return {
            fiat: dataPayment.FIAT,
            systemFiat: dataPayment.FIAT,
            systemCrypto: false,
            crypto: false,
            publishedStatus: dataPayment.FIAT === true ? 'active' : 'inactive',
        }
    }

    static mapPropertyStatus(dataPayment, property, propertyFromReq) {
        let systemFiat = dataPayment.FIAT
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let systemCrypto = dataPayment.CRYPTO && property.deployStatus === CONTRACT_DEPLOY_STATUS.PUBLISHED
        let crypto = property.userCrypto ?? systemCrypto
        let fiat = property.userFiat ?? systemFiat
        let publishedStatus = systemCrypto || systemFiat ? 'active' : 'inactive'
        if (propertyFromReq.userId !== property.userId) {
            return {
                crypto: systemCrypto,
                fiat: systemFiat,
                systemFiat,
                systemCrypto,
                userFiat: null,
                userCrypto: null,
                publishedStatus: systemCrypto || systemFiat ? 'active' : 'inactive',
            }
        }
        if (!systemCrypto) {
            crypto = false
            if (!systemFiat) {
                return {
                    crypto,
                    fiat: false,
                    systemFiat,
                    systemCrypto,
                    publishedStatus: 'inactive',
                }
            }
            if (!fiat) {
                return {
                    crypto,
                    fiat,
                    systemFiat,
                    systemCrypto,
                    publishedStatus: 'inactive',
                }
            }
        }
        if (!systemFiat) {
            fiat = false
            if (!crypto) {
                return {
                    crypto,
                    fiat,
                    systemFiat,
                    systemCrypto,
                    publishedStatus: 'inactive',
                }
            }
        }
        return {
            fiat,
            crypto,
            systemFiat,
            systemCrypto,
            publishedStatus: property.userPublishedStatus ?? publishedStatus,
        }
    }
}
