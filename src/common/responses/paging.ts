export class Paging {
    page: number
    pageSize: number
    total: number
    totalPages: number
    totalCount: number

    constructor(page: number, pageSize: number, total: number, totalPages: number, totalCount?: number) {
        this.page = page
        this.pageSize = pageSize
        this.total = total
        this.totalPages = totalPages
        this.totalCount = totalCount
    }

    public static build(page: number, pageSize: number, total: number, totalCount?: number): Paging {
        const totalPage = Math.ceil(total / pageSize)
        return new Paging(page, pageSize, total, totalPage, totalCount)
    }
}
