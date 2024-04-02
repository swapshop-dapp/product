import { Injectable } from '@nestjs/common'
import { RecordMetadata } from 'kafkajs'
import { TOPICS } from '../constants/const'
import { KafkaProducer } from './kafka.producer'

@Injectable()
export class KafkaUtils {
    constructor(private readonly kafkaProducer: KafkaProducer) {}

    public produceCalendarSyncSuccessEvent(propertyId: number): Promise<RecordMetadata[]> {
        return this.kafkaProducer.produceSingle(TOPICS.CALENDAR_SYNC_SUCCESS, propertyId, {
            id: propertyId,
        })
    }
}
