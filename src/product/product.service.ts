import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
// import { PrismaService } from '@src/common/connections/prisma.service'
import { Utils } from '@src/utils/utils'
import { ConfigService } from '@nestjs/config'
import AWS from 'aws-sdk'
import sharp from 'sharp'

const s3 = new AWS.S3({})
const products = [
    {
        id: 1,
        title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        images: [
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
        ],
        description: 'The new Apple watch series 6 with always on display',
        price: 400,
    },
    // {
    //     title: 'Iphone 11 Pro Max',
    //     images: ['https://static.goswapshop.com/images/iphone.jpg'],
    //     description: 'The new Iphone 11 Pro Max with A13 chip',
    //     price: 200,
    // },
    {
        id: 2,
        title: 'Apple Vision Pro Video Conference 4K Camera',
        images: [
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
        ],
        description: 'The new Apple Vision Pro Video Conference 4K Camera with noise cancelling feature',
        price: 1000,
    },
    {
        id: 3,
        title: 'Apple watch series 6',
        images: [
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
        ],
        description: 'The new Apple watch series 6 with always on display',
        price: 400,
    },
    {
        id: 5,
        title: 'Apple Vision Pro Video Conference 4K Camera',
        images: [
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
        ],
        description: 'The new Apple Vision Pro Video Conference 4K Camera with noise cancelling feature',
        price: 1000,
    },
    // {
    //     title: 'Iphone 11 Pro Max',
    //     images: ['https://static.goswapshop.com/images/iphone.jpg'],
    //     description: 'The new Iphone 11 Pro Max with A13 chip',
    //     price: 200,
    // },
    {
        id: 2,
        title: 'Apple Vision Pro Video Conference 4K Camera',
        images: [
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
        ],
        description: 'The new Apple Vision Pro Video Conference 4K Camera with noise cancelling feature',
        price: 1000,
    },
    {
        id: 3,
        title: 'Apple watch series 6',
        images: [
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
            'https://static.goswapshop.com/images/apple-watch.png',
        ],
        description: 'The new Apple watch series 6 with always on display',
        price: 400,
    },
    {
        id: 5,
        title: 'Apple Vision Pro Video Conference 4K Camera',
        images: [
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
            'https://static.goswapshop.com/images/apple-vision-pro-video-conference-4.webp',
        ],
        description: 'The new Apple Vision Pro Video Conference 4K Camera with noise cancelling feature',
        price: 1000,
    },
    {
        id: 4,
        title: 'Macbook Pro 2023',
        images: [
            'https://static.goswapshop.com/images/macbook.jpg',
            'https://static.goswapshop.com/images/macbook.jpg',
            'https://static.goswapshop.com/images/macbook.jpg',
            'https://static.goswapshop.com/images/macbook.jpg',
            'https://static.goswapshop.com/images/macbook.jpg',
        ],
        description: 'The new Macbook Pro 2023 with M2 chip',
        price: 2000,
    },
]

@Injectable()
export class ProductService {
    private readonly productMaxWidth: number = parseInt(this.configService.get('PRODUCT_IMAGE_MAX_WIDTH') || '4096')
    private readonly productMinWidth: number = parseInt(this.configService.get('PRODUCT_IMAGE_MIN_WIDTH') || '1024')
    private readonly productMinHeight: number = parseInt(this.configService.get('PRODUCT_IMAGE_MIN_HEIGHT') || '683')

    constructor(
        // private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) {}

    getProduct(id: number) {
        const product = products.filter((product) => product.id === id)
        if (product.length) {
            return product[0]
        }
        throw new NotFoundException({ message: 'Product not found' })
    }

    async getAllProduct(queries) {
        return {
            data: products,
            count: products.length,
        }
    }

    async uploadImage(id: number, image: Express.Multer.File) {
        const sharpedImage = await sharp(image.buffer).rotate()
        const metadata = await sharpedImage.metadata()
        if (metadata.width < this.productMinWidth) {
            throw new BadRequestException({
                message: `Image width must be greater than ${this.productMinWidth}px`,
            })
        }
        if (metadata.height < this.productMinHeight) {
            throw new BadRequestException({
                message: `Image height must be greater than ${this.productMinHeight}px`,
            })
        }
        let imageBuffer = image.buffer
        if (metadata.width > this.productMaxWidth) {
            imageBuffer = await sharpedImage
                .resize({
                    width: this.productMaxWidth,
                    withoutEnlargement: true,
                    fit: 'inside',
                    position: 'centre',
                })
                .toBuffer()
        }
        const imageName = Utils.randomString(9)
        const path = `${id}/${imageName}`
        const params = {
            Bucket: this.configService.get('BUCKET'),
            Key: path,
            ACL: 'public-read',
            ContentType: image.mimetype,
            Body: imageBuffer,
        }
        const dataUploaded = await s3.upload(params).promise()
        return `${this.configService.get('CDN_PREFIX')}/${dataUploaded.Key}`
    }
    //
    // async create(data: any) {
    //     return this.prisma.product.create({
    //         data: {
    //             ...data,
    //         },
    //     })
    // }
    //
    // async update(id: number, data: any) {
    //     return this.prisma.product.update({
    //         where: { id },
    //         data: {
    //             ...data,
    //         },
    //     })
    // }
}
