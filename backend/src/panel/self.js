import User from "../models/user.js";
import validator from "../validators.js";
import {email_type, raw_create_send} from "../auth/email.js";
import config from "../config.js";

import * as path from 'path';
import * as fs from 'fs';
import { promisify } from "util";


const self_result = {
    success: 'Sucesso',
    used_data: 'Dados ja usados por algum outro usuario',
    invalid_email: 'Email invalido',
    invalid_phone_number: 'Numero de telefone invalido',
};

const get_self = async(user_id) => {
    let user = await User.read_by_id(user_id);

    const read_file = promisify(fs.readFile);

    const data = await read_file(user.foto);

    user.foto = 'data:image/png;base64,' + data.toString('base64')

    return user;
}

const get_file_path = (user_id) => {
    const upload_dir = path.join(process.cwd(), 'uploads');

    const file_path = path.join(upload_dir, user_id.toString())

    return file_path
}

const update_self = async(user_id, new_email = undefined, phone_number = undefined, emerg_phone_number = undefined, file = undefined) => {
    if(await User.exists({
        new_email,
        phone_number
    })){
        return self_result.used_data; 
    }
    
    let new_data = {};

    if(new_email !== undefined){
        if(!validator.basic_email(new_email)){
            return self_result.invalid_email;
        }

        new_data.email = new_email; 
        new_data.validado = 0;
    }
    
    if(phone_number !== undefined && validator.phone_number_digs(phone_number)){
        if(!validator.phone_number_digs(phone_number)){
            return self_result.invalid_phone_number;
        }

        new_data.telefone = phone_number;
    }

    if(emerg_phone_number !== undefined && validator.phone_number_digs(emerg_phone_number)){
        if(!validator.phone_number_digs(emerg_phone_number)){
            return self_result.invalid_phone_number;
        }

        new_data.telefone_emerg = emerg_phone_number;
    }

    if(file !== undefined){
        new_data.foto = get_file_path(user_id)
    }

    if(Object.keys(new_data).length === 0){
        return self_result.success;
    }

    if('email' in new_data){
        await raw_create_send(user_id, new_email, email_type.VERIFY_ACCOUNT);
    }

    if('foto' in new_data){
        let buffer = Buffer.from(file, 'base64');
        fs.writeFile(new_data.foto, buffer, (_) => {})
    }

    await User.update(user_id, new_data);

    return self_result.success;
}

export {self_result, get_self, update_self}
