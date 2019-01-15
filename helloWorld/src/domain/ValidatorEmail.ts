import { IValidator, validation } from "./IValidator";

export default class ValidatorEmail implements IValidator{
  valid: boolean = true;    
  message: string = "";

  readonly emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  validate(email: string, size?: number | undefined): validation {
    this.valid = true;
    this.message = "";

    if (email.trim() == ''){
      this.message = 'Por favor insira um E-mail.';
      this.valid = false;
    }
    else if (!this.emailRegex.test(email)){
      this.message = 'Por favor insira um E-mail válido.';
      this.valid = false;
    }
    
    return {valid: this.valid, message: this.message};
  }
}