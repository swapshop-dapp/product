import { HttpStatus, ParseFilePipe } from '@nestjs/common'

export const UploadProductImagePipe = new ParseFilePipe({
    validators: [],
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    fileIsRequired: true,
})
