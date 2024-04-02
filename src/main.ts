import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common'
import helmet from 'helmet'
import compression from 'compression'
import { AppModule } from './app.module'
import { PrismaService } from './common/connections/prisma.service'
import { AllExceptionsFilter } from './common/filters/all-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import initEnv from './common/secret-manager/sm'
import { json, urlencoded } from 'express'

async function bootstrap() {
    await initEnv()
    const app = await NestFactory.create(AppModule)
    app.use(helmet())
    app.use(compression())
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const mapError = (e, messages = []) => {
                    e.children.map((c) => {
                        messages = c.constraints ? messages.concat(Object.values(c.constraints)) : mapError(c, messages)
                    })
                    return messages
                }
                return new BadRequestException({
                    message: errors.reduce((acc, e) => {
                        return e.constraints ? acc.concat(Object.values(e.constraints)) : mapError(e, acc)
                    }, []),
                })
            },
        }),
    )
    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)))
    app.enableVersioning({
        type: VersioningType.URI,
    })

    const prismaService: PrismaService = app.get(PrismaService)

    await prismaService.enableShutdownHooks(app)
    const config = app.get(ConfigService)
    if (process.env.ENV !== 'prod') {
        //Setup swagger
        const configDocs = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Listing Service')
            .setDescription('API description')
            .build()
        const document = SwaggerModule.createDocument(app, configDocs)
        SwaggerModule.setup('docs', app, document)
    }
    await app.listen(config.get('PORT') || 3000)
}

bootstrap()
