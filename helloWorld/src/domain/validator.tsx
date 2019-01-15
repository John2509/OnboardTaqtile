class validation {
  public valid: boolean = true;
  public message: string = '';
}

export interface validator {
  (text: string, size?: number): validation
}

export function validateEmail(email: string, size?: number) : validation{
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var valid = true;
    var message = "";

    if (email.trim() == ''){
      message = 'Por favor insira um E-mail.';
      valid = false;
    }
    else if (!emailRegex.test(email)){
      message = 'Por favor insira um E-mail válido.';
      valid = false;
    }

    return {valid: valid, message: message};
}

export function validatePassword(password: string, size?: number) : validation{
    size = size || 7;

    var senhaRegex1 = new RegExp('.{'+size+',}');
    var senhaRegex2 = new RegExp(/\d/);
    var senhaRegex3 = new RegExp(/\w/);

    var valid = true;
    var message = "";

    if (password.trim() == ''){
      message = 'Por favor insira uma Senha.';
      valid = false;
    }
    else if (!senhaRegex1.test(password)){
      message = `Por favor insira uma Senha com pelo menos ${size} caracteres.`;
      valid = false;
    }
    else if (!senhaRegex2.test(password)){
      message = 'Por favor insira uma Senha com pelo menos 1 digito.';
      valid = false;
    }
    else if (!senhaRegex3.test(password)){
      message = 'Por favor insira uma Senha com pelo menos 1 letra.';
      valid = false;
    }

    return {valid: valid, message: message};
}

export function validateName(name: string, size?: number) : validation{
    var nameRegex = new RegExp(/[^A-Za-z ]/);

    var valid = true;
    var message = "";

    if (name.trim() == ''){
      message = 'Por favor insira um Nome.';
      valid = false;
    }
    else if (nameRegex.test(name)){
      message = 'Por favor insira um Nome com apenas letras.';
      valid = false;
    }

    return {valid: valid, message: message};
}