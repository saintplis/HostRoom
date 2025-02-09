import EmailCode from "../models/email_code.js";
import User from "../models/user.js";
import config from '../config.js';
import validator from "../validators.js";

import * as fs from 'fs';
import * as path from 'path';

const email_type = {
    VERIFY_ACCOUNT: 0,
    FORGOT_PASSWORD,
};

const email_result = {
    success: 'Sucesso',
    invalid_data: 'Dados invalidos',
    already_validated: 'Email ja validado',
    invalid_code_or_email: 'Codigo ou email invalido',
    used_code: 'Codigo ja usado',
    expired_code: 'Codigo expirou',
    invalid_code_type: 'Tipo de codigo invalido',
};

const raw_create_send = async (user_id, email, type = email_type.VERIFY_ACCOUNT, name = null) => {
    const __dirname = path.resolve();

    const code = config.rand_str(6);

    await EmailCode.create({
        user_id,
        email,
        codigo: code,
        expira_em: Math.floor((config.cur_time_in_seconds()) + 15 * 60), // 15 minutos de espera
        usado: 0,
        tipo: type
    });

    const file_loc = path.join(__dirname, '/html/code.html');

    const data = fs.readFileSync(file_loc, 'utf-8')
        .toString()
        .replace("$codigo", code)
        .replace("$usuario", name || email);

    await config.email.sendMail({
        to: email,
        subject: "Codigo do HostRoom",
        text: `Seu codigo eh ${code}`,
        html: data,
    });

    return code;
}

const create_code = async (user_data, type = email_type.VERIFY_ACCOUNT) => {
    if(!user_data){
        return email_result.invalid_data;
    }

    if(type == email_type.VERIFY_ACCOUNT && user_data.validado){
        return email_result.already_validated;
    }

    await raw_create_send(user_data.id, user_data.email, type, user_data.nome);

    return email_result.success; 
}

const validate_code_with_code_data = async(code_data, type) => {
    if(!code_data){
        return email_result.invalid_code_or_email;
    }

    if(code_data.usado){
        return email_result.used_code;
    }

    if(code_data.tipo !== type){
        return email_result.invalid_code_type;
    }

    if(code_data.expira_em <= config.cur_time_in_seconds()){
        await raw_create_send(code_data.user_id, email, type); //envia um novo email caso o codigo anterior teja expirado
        return email_result.expired_code;
    }

    if(type == email_type.VERIFY_ACCOUNT){
        await User.update(code_data.user_id, {
            validado: 1
        });
    }

    await EmailCode.update(code_data.id, {
        usado: 1
    })

    return email_result.success;

}

const validate_code = async(email, code, type = email_type.VERIFY_ACCOUNT) => {
    const code_data = await EmailCode.read_by_code_and_email(code, email);

    return validate_code_with_code_data(code_data, type);
}

const forgot_password = async(email) =>{
    let user_data = await User.read_by_email(email);

    if(!user_data){
        return email_result.invalid_data;
    }

    await raw_create_send(user_data.id, user_data.email, email_type.FORGOT_PASSWORD, user_data.nome);

    return email_result.success; 
}

const forgot_change_password = async(code, new_pass) =>{
    let code_data = await EmailCode.read_by_code(code);

    if(!code_data){
        return email_result.invalid_data;
    }

    if(!validator.pass(new_pass)){
        return change_pass_result.bad_pass_length;
    }

    let result = await validate_code_with_code_data(user_data.email);

    if(result !== email_result.success){
        return result;
    }

    const hashed_pass = await bcrypt.hash(new_pass, 10);

    await User.update(code_data.user_id, {
        senha: hashed_pass 
    });

    return email_result.success; 
}

export {forgot_password, forgot_change_password, create_code, validate_code, email_result}
