import { change_pass_result, change_password } from "../panel/change_password.js";

let panel_route = {};

const respond = (response, result) => {
    let formatted_msg = { message: result };

    if(result !== change_pass_result.success){
        return response.status(400).send(formatted_msg);
    }

    return response.send(formatted_msg);
}

panel_route.change_pass_post = async (request, response) => {
    const user_id = request.session.get('id');

    if(!user_id){
        return respond(response, 'Usuário nao logado');
    }

    let body = request.body;

    if(!body || !body.hasOwnProperty('senha_antiga') || !body.hasOwnProperty('senha_nova')){
        return respond(response, 'Preencha a senha antiga e nova');
    }

    const { senha_antiga, senha_nova } = request.body;

    let result = await change_password(user_id, senha_antiga, senha_nova);

    return respond(response, result);
}

export default panel_route
