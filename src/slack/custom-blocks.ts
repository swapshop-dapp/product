import { HeaderBlock, KnownBlock, MrkdwnElement, PlainTextElement, SectionBlock } from '@slack/web-api'

export class SimpleSectionBlock implements SectionBlock {
    type: 'section'
    text: MrkdwnElement

    constructor(text?: string, verbatim?: boolean) {
        this.text = { text, type: 'mrkdwn', verbatim: verbatim || false }
        this.type = 'section'
    }

    public static of(text?: string, verbatim?: boolean): KnownBlock {
        return new SimpleSectionBlock(text, verbatim)
    }
}

export class SimpleHeaderBlock implements HeaderBlock {
    type: 'header'
    text: PlainTextElement

    constructor(text?: string) {
        this.text = { text, type: 'plain_text' }
        this.type = 'header'
    }

    public static of(text?: string): KnownBlock {
        return new SimpleHeaderBlock(text)
    }
}
