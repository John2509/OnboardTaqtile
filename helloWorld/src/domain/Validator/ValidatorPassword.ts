import { IValidator, validation } from "./IValidator";

export default class ValidatorPassword implements IValidator{
  valid: boolean = true;    
  message: string = "";

  private senhaRegex1 = new RegExp('.{7,}');
  readonly senhaRegex2 = new RegExp(/\d/);
  readonly senhaRegex3 = new RegExp(/\w/);

  validate(password: string, size?: number | undefined): validation {

    if (size){
      this.senhaRegex1 = new RegExp('.{'+size+',}');
    }
    else {
      size = 7;
    }

    this.valid = true;
    this.message = "";

    if (password.trim() == ''){
      this.message = 'Por favor insira uma Senha.';
      this.valid = false;
    }
    else if (!this.senhaRegex1.test(password)){
      this.message = `Por favor insira uma Senha com pelo menos ${size} caracteres.`;
      this.valid = false;
    }
    else if (!this.senhaRegex2.test(password)){
      this.message = 'Por favor insira uma Senha com pelo menos 1 digito.';
      this.valid = false;
    }
    else if (!this.senhaRegex3.test(password)){
      this.message = 'Por favor insira uma Senha com pelo menos 1 letra.';
      this.valid = false;
    }

    return {valid: this.valid, message: this.message};
  }
}