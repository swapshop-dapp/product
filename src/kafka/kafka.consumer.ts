import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, Kafka } from 'kafkajs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KafkaConsumer implements OnModuleDestroy {
    constructor(private readonly config: ConfigService) {
        this.kafka = new Kafka({
            brokers: [...config.get('KAFKA_BROKERS').split(',')],
        })
    }

    async onModuleDestroy() {
        for (const consumer of this.consumers) {
            await consumer.disconnect()
        }
    }

    private readonly kafka: Kafka
    private readonly consumers: Consumer[] = []

    async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig, groupId: string) {
        const consumer = this.kafka.consumer({ groupId })
        await consumer.connect()
        await consumer.subscribe(topic)
        await consumer.run(config)
        this.consumers.push(consumer)
    }
}
