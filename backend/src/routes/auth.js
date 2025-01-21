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
        || !body.hasOwnProperty('confirmar_senha')
        || !body.hasOwnProperty('telefone')){
        return response.status(400).send({
            message: 'Preencha todos os campos'
        });
    }

    const { nome, data, cpf, email, senha, confirmar_senha, telefone } = body;

    if(senha !== confirmar_senha){
        return response.status(400).send({
            message: 'Senha diferente da confirmada'
        });
    }

    let result = await register(nome, data, cpf, '', '', email, senha, telefone);

    response.send({
        message: result
    });
}

export default auth_route 
