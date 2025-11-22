/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPasswordDecorator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) {
      return false;
    }
    return true;
  }
  defaultMessage(): string {
    return 'Password and Confirm Password do not match';
  }
}
