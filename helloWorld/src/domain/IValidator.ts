export class validation {
  public valid: boolean = true;
  public message: string = '';
}

export interface IValidator {
  valid: boolean;
  message: string;
  validate(text: string, size?: number): validation;
}