import { Module } from '@nestjs/common'
import { KafkaProducer } from './kafka.producer'
import { KafkaConsumer } from './kafka.consumer'
import { ConfigModule } from '@nestjs/config'
import { KafkaUtils } from './kafka.utils'

@Module({
    imports: [ConfigModule],
    providers: [KafkaProducer, KafkaConsumer, KafkaUtils],
    exports: [KafkaProducer, KafkaConsumer, KafkaUtils],
})
export class KafkaModule {}
