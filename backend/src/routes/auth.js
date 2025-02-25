import { validate_code, email_result, forgot_password, forgot_change_password } from "../auth/email.js";
import {login, login_result} from "../auth/login.js";
import {register, register_result} from "../auth/register.js";

let auth_route = {};

const respond = (response, result) => {
    let formatted_msg = { message: result };

    if(result !== login_result.success && result !== register_result.success && result !== email_result.success){
        return response.status(400).send(formatted_msg);
    }

    return response.send(formatted_msg);
}

auth_route.login_post = async (request, response) => {
    let body = request.body;

    if(!body || !body.hasOwnProperty('usuario') || !body.hasOwnProperty('senha')){
        return respond(response, 'Preencha o usuário e a senha');
    }

    const { usuario, senha } = request.body;

    let id = -1;
    let result = await login(usuario, senha);

    if(Number.isInteger(result)){
        id = result;
        result = login_result.success;
    } 

    let token = await response.jwtSign({ id });

    return response.send({ message: result, token: token });
}

auth_route.register_post = async (request, response) => {
    let body = request.body;

    if(!body 
        || !body.hasOwnProperty('nome') 
        || !body.hasOwnProperty('data')
        || !body.hasOwnProperty('cpf')
        || !body.hasOwnProperty('email')
        || !body.hasOwnProperty('senha')
        || !body.hasOwnProperty('telefone')){
        return respond(response, 'Preencha todos os campos');
    }

    const { nome, data, cpf, email, senha, telefone, telefone_emerg = "" } = body;

    let result = await register(nome, data, cpf, email, senha, telefone, telefone_emerg);

    return respond(response, result);
}

auth_route.verify_post = async (request, response) => {
    let body = request.body;

    if(!body 
        || !body.hasOwnProperty('email') 
        || !body.hasOwnProperty('codigo')){
        return respond(response, 'Preencha todos os campos');
    }

    const { email, codigo } = body;

    let result = await validate_code(email, codigo);

    return respond(response, result);
}

auth_route.forgot_password_post = async (request, response) => {
    let body = request.body;

    if(!body 
        || !body.hasOwnProperty('email')){
        return respond(response, 'Preencha todos os campos');
    }

    const { email } = body;

    let result = await forgot_password(email);

    return respond(response, result);
}

auth_route.forgot_change_password_post = async (request, response) => {
    let body = request.body;

    if(!body 
        || !body.hasOwnProperty('codigo')
        || !body.hasOwnProperty('nova_senha')){
        return respond(response, 'Preencha todos os campos');
    }

    const { codigo, nova_senha } = body;

    let result = await forgot_change_password(codigo, nova_senha);

    return respond(response, result);
}

export default auth_route 
