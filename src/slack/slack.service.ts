import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WebClient } from '@slack/web-api'

@Injectable()
export default class SlackService {
    private web

    constructor(private readonly config: ConfigService) {
        this.web = new WebClient(config.get<string>('slackToken'))
    }

    sendSlack(channel, msg) {
        return this.web.chat.postMessage({ channel, text: msg })
    }

    sendSlackBlocks(channel, blocks) {
        return this.web.chat.postMessage({ channel, text: 'blocks', blocks })
    }
}
