import { IValidator, validation } from "./IValidator";

export default class ValidatorName implements IValidator{
  valid: boolean = true;    
  message: string = "";

  readonly nameRegex = new RegExp(/[^A-Za-z ]/);

  validate(name: string, size?: number | undefined): validation {
    this.valid = true;
    this.message = "";

    if (name.trim() == ''){
      this.message = 'Por favor insira um Nome.';
      this.valid = false;
    }
    else if (this.nameRegex.test(name)){
      this.message = 'Por favor insira um Nome com apenas letras.';
      this.valid = false;
    }
    
    return {valid: this.valid, message: this.message};
  }
}