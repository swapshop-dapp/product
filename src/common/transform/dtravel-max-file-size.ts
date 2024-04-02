import { MaxFileSizeValidator } from '@nestjs/common'

export class GMaxFileSizeValidator extends MaxFileSizeValidator {
    private readonly maxSize: number = 5
    private readonly message: any

    constructor({ maxSize, message }: { maxSize: number; message?: string }) {
        super({
            maxSize,
        })
        this.message = message
        this.maxSize = maxSize
    }

    buildErrorMessage(): string {
        return this.message || `Product image cannot exceed ${this.maxSize}MB`
    }
}
