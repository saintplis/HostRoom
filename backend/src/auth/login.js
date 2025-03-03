import bcrypt from 'bcrypt'
import User from "../models/user.js";
import { email_type, raw_create_send } from './email.js';

const login_result = {
    success: 'Sucesso',
    invalid_email: 'Dados inválidos',
    invalid_pass: 'Dados Inválidos',
    unverified_email: 'Por favor cheque seu email para obter o codigo de verificacao',
};

const login = async (user, pass) => {
    let user_data = await User.read_with_email_or_cpf(user);
    
    if(!user_data){
        return login_result.invalid_email;
    }
    
    if(!(await bcrypt.compare(pass, user_data.senha))){
        return login_result.invalid_pass;
    }

    if(!user_data.validado){
        await raw_create_send(user_data.id, user_data.email, email_type.VERIFY_ACCOUNT, user_data.nome);
        return login_result.unverified_email;
    }

    return user_data.id; 
}

export {login, login_result}
