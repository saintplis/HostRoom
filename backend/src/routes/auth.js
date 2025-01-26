import { validate_code, email_result } from "../auth/email.js";
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
    if(request.session.get('id')){ //sessao ja existente
        return respond(response, 'Usuário ja existe');
    }

    let body = request.body;

    if(!body || !body.hasOwnProperty('usuario') || !body.hasOwnProperty('senha')){
        return respond(response, 'Preencha o usuário e a senha');
    }

    const { usuario, senha } = request.body;

    let result = await login(usuario, senha);

    return respond(response, result);
}

auth_route.register_post = async (request, response) => {
    if(request.session.get('id')){ //sessao ja existente
        return respond(response, 'Usuário ja existe');
    }

    let body = request.body;

    if(!body 
        || !body.hasOwnProperty('nome') 
        || !body.hasOwnProperty('data')
        || !body.hasOwnProperty('cpf')
        || !body.hasOwnProperty('email')
        || !body.hasOwnProperty('senha')
        || !body.hasOwnProperty('telefone')
        || !body.hasOwnProperty('telefone_emerg')){
        return respond(response, 'Preencha todos os campos');
    }

    const { nome, data, cpf, email, senha, telefone, telefone_emerg } = body;

    let result = await register(nome, data, cpf, email, senha, telefone, telefone_emerg);

    return respond(response, result);
}

auth_route.verify_post = async (request, response) => {
    if(request.session.get('id')){ //sessao ja existente
        return respond(response, 'Nao se pode verificar quando se esta logado');
    }

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

export default auth_route 
