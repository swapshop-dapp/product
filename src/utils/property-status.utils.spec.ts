import { PropertyStatusUtils } from './property-status.utils'
import { CONTRACT_DEPLOY_STATUS } from '../constants/const'

describe('PropertyStatusUtils', function () {
    describe('generateStatusForNewProperty', function () {
        it(' should be return data map with input data', async () => {
            const dataResult = PropertyStatusUtils.generateStatusForNewProperty({
                CRYPTO: true,
                FIAT: true,
            })
            expect(dataResult.systemFiat).toEqual(true)
            expect(dataResult.fiat).toEqual(true)
            expect(dataResult.publishedStatus).toEqual('active')
            expect(dataResult.systemCrypto).toEqual(false)
            expect(dataResult.crypto).toEqual(false)
        })
        it(' should be return data with publishedStatus=inactive', async () => {
            const dataResult = PropertyStatusUtils.generateStatusForNewProperty({
                CRYPTO: true,
                FIAT: false,
            })
            expect(dataResult.systemFiat).toEqual(false)
            expect(dataResult.fiat).toEqual(false)
            expect(dataResult.publishedStatus).toEqual('inactive')
            expect(dataResult.systemCrypto).toEqual(false)
            expect(dataResult.crypto).toEqual(false)
        })
    })
    describe('mapPropertyStatus', function () {
        let dataPaymentMock = {
            FIAT: true,
            CRYPTO: true,
        }
        let propertyMock = {
            fiat: true,
            crypto: true,
            publishedStatus: 'active',
            systemFiat: true,
            systemCrypto: true,
            userId: 'example',
            propertyDeployStatus: CONTRACT_DEPLOY_STATUS.PUBLISHED,
        }
        let propertyReqMock = {
            userId: '1',
        }
        it('should be return new status payment when property owner updated', () => {
            const paymentStatus = PropertyStatusUtils.mapPropertyStatus(dataPaymentMock, propertyMock, propertyReqMock)
            expect(paymentStatus.publishedStatus).toEqual('active')
        })
        it('should be return status inactive when property owner updated', () => {
            dataPaymentMock = {
                CRYPTO: false,
                FIAT: false,
            }
            propertyMock = { ...propertyMock, fiat: false }
            const paymentStatus = PropertyStatusUtils.mapPropertyStatus(dataPaymentMock, propertyMock, propertyReqMock)
            expect(paymentStatus.publishedStatus).toEqual('inactive')
        })
        it('should be return status inactive when payment method is off', () => {
            dataPaymentMock = {
                CRYPTO: false,
                FIAT: false,
            }
            propertyReqMock.userId = 'example'
            const paymentStatus = PropertyStatusUtils.mapPropertyStatus(dataPaymentMock, propertyMock, propertyReqMock)
            expect(paymentStatus.publishedStatus).toEqual('inactive')
        })
    })
})
