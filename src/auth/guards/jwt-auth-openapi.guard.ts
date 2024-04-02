import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtAuthOpenapiGuard extends AuthGuard('jwt-openapi') {}
