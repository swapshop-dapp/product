import * as AWS from '@aws-sdk/client-secrets-manager'
import { Logger } from '@nestjs/common'
import { GetSecretValueCommandOutput } from '@aws-sdk/client-secrets-manager'
const client = new AWS.SecretsManager({ region: 'ap-southeast-1' })

export default async () => {
    try {
        if (process.env.SECRET_NAMES) {
            const secrets = process.env.SECRET_NAMES.split(',')
            const allSecrets = []
            for (const secret of secrets) {
                allSecrets.push(client.getSecretValue({ SecretId: secret }))
            }
            const results: GetSecretValueCommandOutput[] = await Promise.all(allSecrets)
            for (const result of results) {
                Object.assign(process.env, JSON.parse(result.SecretString))
            }
        }
    } catch (error) {
        Logger.error('Can not retrieve secrets')
        throw error
    }
}
