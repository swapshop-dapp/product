import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export function shortenWalletAddress(walletAddress: string) {
    if (!walletAddress) return ''
    return `${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`
}

export function messageFromPrismaError(error: PrismaClientKnownRequestError): string {
    switch (error.code) {
        case 'P2000':
            return `The provided value for the column is too long for the column's type. Column: ${(
                error.meta.target as any
            ).join(', ')}`
        case 'P2002':
            return `Unique constraint failed on the fields ${(error.meta.target as any).join(', ')}`
        default:
            return `Oops! Something went wrong`
    }
}
