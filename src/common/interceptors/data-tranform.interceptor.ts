import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { BaseResponse } from '../responses/base.response'
import snakeCaseKeys from 'snakecase-keys'

@Injectable()
export class DataTransformInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data instanceof Object) {
                    if (data instanceof BaseResponse) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return snakeCaseKeys(data, { deep: true })
                    } else {
                        return data
                        // return snakeCaseKeys({ success: true, data }, { deep: true })
                    }
                }
                return data
            }),
        )
    }
}
