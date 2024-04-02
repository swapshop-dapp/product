import { ErrorResponse } from './error.response'
import { Paging } from './paging'

interface IBaseResponse<T> {
    success: boolean
    data: T
    error?: ErrorResponse
    paging?: Paging
}

export class BaseResponse<T> {
    public success: boolean
    public data: T
    public error?: ErrorResponse | string
    public paging?: Paging

    public constructor(args: IBaseResponse<T>) {
        this.success = args.success
        this.data = args.data
        if (args.error) {
            this.error = args.error
        }
        if (args.paging) {
            this.paging = args.paging
        }
    }

    public static ok<T>(data: T, paging?: Paging): BaseResponse<T> {
        return new BaseResponse<T>({ success: true, data, paging })
    }

    public static error<T>(data: T, error: ErrorResponse): BaseResponse<T> {
        return new BaseResponse<T>({ success: false, data, error })
    }
}
