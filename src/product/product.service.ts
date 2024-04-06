import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
// import { PrismaService } from './common/connections/prisma.service'
import { Utils } from '../utils/utils'
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
        description: 'The most advanced Apple Watch features powerful health innovations like sensors and apps to measure your blood oxygen and take an ECG.',
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
        description: ' Apple Watch Series 6 GPS + Cellular LTE Model lets you call, text, and get directions without your phone present. It offers multiple connectivity options, including: Bluetooth, Wi-Fi, NFC, and 4G LTE to suit your needs, whatever they might be',
        price: 400,
    },
    {
        id: 5,
        title: 'Apple Ipad 10th Generation',
        images: [
            'https://static.goswapshop.com/images/apple-ipad-1.png',
            'https://static.goswapshop.com/images/apple-ipad-2.jpg',
            'https://static.goswapshop.com/images/apple-ipad-3.jpg',
        ],
        description: 'olorfully reimagined and more versatile than ever, iPad is great for the things you do every day. With an all-screen design, 10.9-inch Liquid Retina display, powerful A14 Bionic chip, superfast Wi-Fi, and four gorgeous colors, iPad delivers a powerful way to create, stay connected, and get things done.',
        price: 1000,
    },
    // {
    //     title: 'Iphone 11 Pro Max',
        // images: ['https://static.goswapshop.com/images/iphone.jpg'],
    //     description: 'The new Iphone 11 Pro Max with A13 chip',
    //     price: 200,
    // },
    {
        id: 7,
        title: 'Apple Imac 2023',
        images: [
            'https://static.goswapshop.com/images/apple-imac-1.jpg',
            'https://static.goswapshop.com/images/apple-imac-2.webp',
            'https://static.goswapshop.com/images/apple-imac-3.png',
        ],
        description: 'The all-in-one desktop design is strikingly thin, comes in four vibrant colors, and becomes the centerpiece of any room. Get more done faster with a next-generation chip from Apple. From creating presentations to gaming, you will fly through work and play',
        price: 1000,
    },
    {
        id: 8,
        title: 'Apple Airpods Pro',
        images: [
            'https://static.goswapshop.com/images/apple-airpods-pro-1.avif',
            'https://static.goswapshop.com/images/apple-airpods-pro-2.jpg',
            'https://static.goswapshop.com/images/apple-airpods-pro-3.webp',
        ],
        description: 'The Apple-designed H2 chip helps to create more intelligent noise cancellation and deeply immersive sound. The low-distortion, custom-built driver delivers crisp, clear high notes and full, rich bass in stunning definition.',
        price: 400,
    },
    {
        id: 9,
        title: 'Apple Iphone 15',
        images: [
            'https://static.goswapshop.com/images/apple-iphone-15-1.jpg',
            'https://static.goswapshop.com/images/apple-iphone-15-2.jpg',
            'https://static.goswapshop.com/images/apple-iphone-15-3.jpg',
            'https://static.goswapshop.com/images/apple-iphone-15-4.jpg',
        ],
        description: 'The newest Iphones from the house of Apple. Featuring the Iphone 15 and Iphone 15 Pro.',
        price: 1000,
    },
    {
        id: 4,
        title: 'Macbook Pro 2023',
        images: [
            'https://static.goswapshop.com/images/apple-macbook-pro-1.jpg',
            'https://static.goswapshop.com/images/apple-macbook-pro-2.jpg',
            'https://static.goswapshop.com/images/apple-macbook-pro-3.jpg',
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

    async create(data: any) {
        // return this.prisma.product.create({
        //     data: {
        //         ...data,
        //     },
        // })
    }

    async update(id: number, data: any) {
        // return this.prisma.product.update({
        //     where: { id },
        //     data: {
        //         ...data,
        //     },
        // })
    }
}
