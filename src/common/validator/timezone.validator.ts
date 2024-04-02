import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { DateTime } from 'luxon'

@ValidatorConstraint({ async: false })
export class TimezoneValidator implements ValidatorConstraintInterface {
    validate(value: any): Promise<boolean> | boolean {
        const timezone = DateTime.local().setZone(value)
        return timezone.isValid
    }

    defaultMessage(): string {
        return `Timezone $value is not valid`
    }
}

export function IsTimezone(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: TimezoneValidator,
        })
    }
}
