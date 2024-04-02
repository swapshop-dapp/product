import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import SlackService from './slack.service'

@Module({
    imports: [],
    controllers: [],
    providers: [SlackService, ConfigService],
    exports: [SlackService],
})
export class SlackModule {}
