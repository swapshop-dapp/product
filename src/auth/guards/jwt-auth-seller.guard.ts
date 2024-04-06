import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthSellerGuard extends AuthGuard('jwt-seller') {}
