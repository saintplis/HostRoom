import {login} from "../auth/login.js";
import {register} from "../auth/register.js";

let auth_route = {};

auth_route.login_post = async (request, response) => {
    if(request.session.get('id')){ //sessao ja existente
        return response.status(401).send({
            messsage: 'Usuário ja existe'
        });
    }

    if(!request.body || !request.body.hasOwnProperty('usuario') || !request.body.hasOwnProperty('senha')){
        return response.status(400).send({
            message: 'Preencha o usuário e a senha'
        });
    }

    const { usuario, senha } = request.body;

    let result = await login(usuario, senha);

    response.send({
        message: result
    });
}

auth_route.register_post = async (request, response) => {
    if(request.session.get('id')){ //sessao ja existente
        return response.status(401).send({
            messsage: 'Usuário ja existe'
        });
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
        return response.status(400).send({
            message: 'Preencha todos os campos'
        });
    }

    const { nome, data, cpf, email, senha, telefone, telefone_emerg } = body;

    let result = await register(nome, data, cpf, email, senha, telefone, telefone_emerg);

    response.send({
        message: result
    });
}

export default auth_route 
