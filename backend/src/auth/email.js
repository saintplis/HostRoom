import EmailCode from "../models/email_code.js";
import User from "../models/user.js";
import config from '../config.js';

import * as fs from 'fs';
import * as path from 'path';

const email_result = {
    success: 'Sucesso',
    invalid_data: 'Dados invalidos',
    already_validated: 'Email ja validado',
    invalid_code_or_email: 'Codigo ou email invalido',
    used_code: 'Codigo ja usado',
    expired_code: 'Codigo expirou',
};

const raw_create_send = async (user_id, email, name = null) => {
    const __dirname = path.resolve();

    const code = config.rand_str(6);

    await EmailCode.create({
        user_id,
        email,
        codigo: code,
        expira_em: Math.floor((config.cur_time_in_seconds()) + 15 * 60), // 15 minutos de espera
        usado: 0,
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

const create_code = async (user_data) => {
    if(!user_data){
        return email_result.invalid_data;
    }

    if(user_data.validado){
        return email_result.already_validated;
    }

    await raw_create_send(user_data.id, user_data.email, user_data.nome);

    return email_result.success; 
}

const validate_code = async(email, code) => {
    const code_data = await EmailCode.read_by_code_and_email(code, email);

    if(!code_data){
        return email_result.invalid_code_or_email;
    }

    if(code_data.usado){
        return email_result.used_code;
    }

    if(code_data.expira_em <= config.cur_time_in_seconds()){
        await raw_create_send(code_data.user_id, email); //envia um novo email caso o codigo anterior teja expirado
        return email_result.expired_code;
    }

    await User.update(code_data.user_id, {
        validado: 1
    });

    await EmailCode.update(code_data.id, {
        usado: 1
    })

    return email_result.success;
}

export {create_code, validate_code, email_result}
