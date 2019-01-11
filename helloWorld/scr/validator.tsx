export function validateEmail(email: string) : 
  {
    error: boolean,
    message: string,
  }{
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    var error = false;
    var message = "";

    if (email == ''){
      message = 'Por favor insira um E-mail.';
      error = true;
    }
    else if (!emailRegex.test(email)){
      message = 'Por favor insira um E-mail válido.';
      error = true;
    }

    return {error: error, message: message};
}

export function validatePassword(password: string) : 
  {
    error: boolean,
    message: string,
  }{
    var senhaRegex1 = new RegExp(/.{4,}/);
    var senhaRegex2 = new RegExp(/\d/);
    var senhaRegex3 = new RegExp(/\w/);

    var error = false;
    var message = "";

    if (password == ''){
      message = 'Por favor insira uma Senha.';
      error = true;
    }
    else if (!senhaRegex1.test(password)){
      message = 'Por favor insira uma Senha com pelo menos 4 caracteres.';
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
    var nomeRegex = new RegExp(/[A-Za-z]+/);

    return {error: false, message: ""};
}