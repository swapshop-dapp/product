import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Kafka, Producer, ProducerRecord, RecordMetadata } from 'kafkajs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KafkaProducer implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly config: ConfigService) {
        this.kafka = new Kafka({
            brokers: [...config.get('KAFKA_BROKERS').split(',')],
        })
        this.producer = this.kafka.producer()
    }

    async onModuleDestroy() {
        await this.producer.disconnect()
    }

    async onModuleInit() {
        await this.producer.connect()
    }

    private readonly kafka: Kafka
    private readonly producer: Producer

    async produce(record: ProducerRecord): Promise<RecordMetadata[]> {
        return await this.producer.send(record)
    }

    async produceSingle(topic: string, key: any, value: string | object | Buffer): Promise<RecordMetadata[]> {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return this.producer.send({
            topic,
            messages: [{ key: `${key}`, value }],
        })
    }
}
