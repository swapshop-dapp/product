import { FileTypeValidator } from '@nestjs/common'

export class GFileTypeValidator extends FileTypeValidator {
    private readonly fileType: string | RegExp
    private readonly message: any

    constructor({ fileType, message }: { fileType: string | RegExp; message?: string }) {
        super({
            fileType,
        })
        this.message = message
        this.fileType = fileType
    }

    buildErrorMessage(): string {
        return this.message || `Only PNG, JPG, JPEG, GIF and WEBP images are accepted`
    }
}
