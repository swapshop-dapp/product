import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { KafkaProducer } from '../../kafka/kafka.producer'
import { PROPERTY_STATUS, TOPICS } from '../../constants/const'
import { PrismaService } from '../connections/prisma.service'

@Injectable()
export class RequestLog<T> implements NestInterceptor {
    @Inject()
    private readonly kafkaProducer: KafkaProducer

    @Inject()
    private readonly prisma: PrismaService

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        const request = context.switchToHttp().getRequest()
        return next.handle().pipe(
            map(async (data) => {
                const { query, headers } = request
                const listing = await this.prisma.property.findFirst({
                    where: {
                        status: PROPERTY_STATUS.ACTIVE,
                        id: parseInt(query.propertyId),
                        userId: query.walletId.toLowerCase(),
                    },
                    select: {
                        id: true,
                        walletId: true,
                        userId: true,
                    },
                })
                if (!listing) {
                    return null
                }
                await this.kafkaProducer.produce({
                    topic: TOPICS.REQUEST_LOG,
                    messages: [
                        {
                            value: JSON.stringify({
                                ip: headers['x-forwarded-for'],
                                userId: listing.userId,
                                walletId: listing.walletId,
                                listingId: listing.id,
                            }),
                        },
                    ],
                })
                return data
            }),
        )
    }
}
