import axios from 'axios'
import * as url from 'url'
import isUrl from 'is-url'

const urlParse = url.URL

export class ImageUtils {
    public static async isImageUrlValid(
        url: string,
        maxSize?: number,
    ): Promise<{ isValid?: boolean; isOverSize?: boolean }> {
        // When URL Not Exists
        // If url is not HTTP URL (Local Path)
        if (!url || !isUrl(url) || !new urlParse(url).pathname) return {}
        let res = await axios.head(url).catch((e) => undefined)
        if (!res || res.status < 200 || res.status >= 300) return {}
        const contentType = res.headers['content-type']
        const contentLength = res.headers['content-length']
        if (!contentType) return {}
        return {
            isValid: contentType.search(/^image\//) != -1,
            isOverSize: contentLength && parseInt(contentLength) > maxSize,
        }
    }
}
