export function validateEmail(email: string) : 
  {
    error: boolean,
    message: string,
  }{
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var error = false;
    var message = "";

    if (email.trim() == ''){
      message = 'Por favor insira um E-mail.';
      error = true;
    }
    else if (!emailRegex.test(email)){
      message = 'Por favor insira um E-mail válido.';
      error = true;
    }

    return {error: error, message: message};
}

export function validatePassword(password: string, size?: number) : 
  {
    error: boolean,
    message: string,
  }{
    size = size || 7;

    var senhaRegex1 = new RegExp('.{'+size+',}');
    var senhaRegex2 = new RegExp(/\d/);
    var senhaRegex3 = new RegExp(/\w/);

    var error = false;
    var message = "";

    if (password.trim() == ''){
      message = 'Por favor insira uma Senha.';
      error = true;
    }
    else if (!senhaRegex1.test(password)){
      message = `Por favor insira uma Senha com pelo menos ${size} caracteres.`;
      error = true;
    }
    else if (!senhaRegex2.test(password)){
      message = 'Por favor insira uma Senha com pelo menos 1 digito.';
      error = true;
    }
    else if (!senhaRegex3.test(password)){
      message = 'Por favor insira uma Senha com pelo menos 1 letra.';
      error = true;
    }

    return {error: error, message: message};
}

export function validateName(name: string) : 
  {
    error: boolean,
    message: string,
  }{
    var nameRegex = new RegExp(/[^A-Za-z ]/);

    var error = false;
    var message = "";

    if (name.trim() == ''){
      message = 'Por favor insira um Nome.';
      error = true;
    }
    else if (nameRegex.test(name)){
      message = 'Por favor insira um Nome com apenas letras.';
      error = true;
    }

    return {error: error, message: message};
}