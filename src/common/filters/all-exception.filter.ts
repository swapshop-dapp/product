import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { isNumber } from 'class-validator'
import { AxiosException } from '../exceptions/AxiosException'
import { BaseResponse } from '../responses/base.response'
import { ErrorResponse } from '../responses/error.response'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: Error, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost

        const ctx = host.switchToHttp()
        let httpStatus = HttpStatus.BAD_GATEWAY
        let responseBody = new BaseResponse({
            success: false,
            data: undefined,
            error: new ErrorResponse('BAD_GATEWAY', process.env.ENV === 'prod' ? 'Bad gateway' : exception.message),
        })
        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus()
            responseBody.error = { ...(<ErrorResponse>exception.getResponse()), error: exception.name }
        } else if (exception['status'] && isNumber(exception['status']) && exception['status'] >= 400) {
            httpStatus = exception['status']
            if (exception.message.length > 512) {
                exception.message = 'Unknown error'
            }
            responseBody.error = {
                error: exception.name,
                message: exception.message,
                code: '0',
            }
        } else {
            console.error(`HTTP ERROR WITH CODE = ${httpStatus}, ${exception.message}`, exception.stack)
        }

        console.error(`HTTP ERROR WITH CODE = ${httpStatus}, ${JSON.stringify(responseBody)}`)
        if (exception instanceof AxiosException) {
            delete responseBody.error['method']
            delete responseBody.error['url']
            delete responseBody.error['baseUrl']
            delete responseBody.error['data']
        }
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    }
}
