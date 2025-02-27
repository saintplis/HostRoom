import User from "../models/user.js";
import validator from "../validators.js";
import {email_type, raw_create_send} from "../auth/email.js"

const self_result = {
    success: 'Sucesso',
    used_data: 'Dados ja usados por algum outro usuario'
};

const get_self = async(user_id) => {
    return await User.read_by_id(user_id);
}

const update_self = async(user_id, new_email = undefined, phone_number = undefined, emerg_phone_number = undefined) => {
    if(await User.exists({
        new_email,
        phone_number
    })){
        return self_result.used_data; 
    }
    
    let new_data = {};

    if(new_email !== undefined && validator.basic_email(new_email)){
        new_data.email = new_email; 
        new_data.validado = 0;

        await raw_create_send(user_id, new_email, email_type.VERIFY_ACCOUNT);
    }

    if(phone_number !== undefined && validator.phone_number_digs(phone_number)){
        new_data.telefone = phone_number;
    }

    if(emerg_phone_number !== undefined && validator.phone_number_digs(emerg_phone_number)){
        new_data.telefone_emerg = emerg_phone_number;
    }
   
    return await User.update(user_id, new_data);
}

export {self_result, get_self, update_self}
