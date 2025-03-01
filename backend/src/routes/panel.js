import { change_pass_result, change_password } from "../panel/change_password.js";
import { get_rooms, room_result } from "../panel/room.js";
import { get_self, update_self, self_result } from '../panel/self.js';

let panel_route = {};

const respond = (response, result, extra = undefined) => {
    let formatted_msg = { message: result };

    if(result !== change_pass_result.success && result !== room_result.success && result !== self_result.success){
        return response.status(400).send(formatted_msg);
    }

    if(extra){
        Object.assign(formatted_msg, extra);
    }

    return response.send(formatted_msg);
}

panel_route.change_pass_post = async (request, response) => {
    const user_id = (await request.jwtVerify()).id;

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

panel_route.fetch_rooms_get = async(request, response) =>{
    const user_id = (await request.jwtVerify()).id;

    if(!user_id){
        return respond(response, 'Usuário nao logado');
    }

    let data = await get_rooms(user_id);

    return respond(response, room_result.success, {
        data: data
    });
}

panel_route.fetch_self_get = async(request, response) => {
    const user_id = (await request.jwtVerify()).id;

    if(!user_id){
        return respond(response, 'Usuário nao logado');
    }

    let data = await get_self(user_id);

    return respond(response, self_result.success, {
        data: data
    });
}

panel_route.update_self_post = async(request, response) => {
    const user_id = (await request.jwtVerify()).id;

    if(!user_id){
        return respond(response, 'Usuário nao logado');
    }
    
    let body = request.body ?? {};

    let file = undefined

    try{
        file = await request.file()
    } catch(e){
        console.log(e)
    }

    const result = await update_self(user_id, body['email'], body['telefone'], body['telefone_emerg'], file);

    return respond(response, result);
}

export default panel_route
