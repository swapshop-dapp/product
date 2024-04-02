import axios, { AxiosResponse } from 'axios'

export class Utils {
    static exclude<T, Key extends keyof T>(resultSet: T, ...keys: Key[]): Omit<T, Key> {
        for (let key of keys) {
            delete resultSet[key]
        }
        return resultSet
    }

    static randomString(length) {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    static async downloadFile(url: string): Promise<AxiosResponse<string>> {
        try {
            return await axios.get(url, {
                responseType: 'arraybuffer',
            })
        } catch (e) {
            if (e.response.status === 403) return Promise.resolve({ data: undefined } as AxiosResponse<string>)
            throw e
        }
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    static doDateRangesOverlap(range1, range2) {
        return (
            (range1.startDate <= range2.endDate && range1.endDate >= range2.startDate) ||
            (range2.startDate <= range1.endDate && range2.endDate >= range1.startDate)
        )
    }

    static checkDateRangeOverlap(dateRanges) {
        const n = dateRanges?.length
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (this.doDateRangesOverlap(dateRanges[i], dateRanges[j])) {
                    return true // Overlap found
                }
            }
        }

        return false // No overlap found
    }
}
