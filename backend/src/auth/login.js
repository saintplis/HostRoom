import bcrypt from 'bcrypt'
import User from "../models/user.js";

const login_result = {
    success: 'Sucesso',
    invalid_email: 'Email invalido',
    invalid_pass: 'Senha invalida',
};

const login = async (user, pass) => {
    let user_data = await User.read_with_email_or_cpf(user);
    
    if(!user_data){
        return login_result.invalid_email;
    }
    
    if(!(await bcrypt.compare(pass, user_data.senha))){
        return login_result.invalid_pass;
    }

    return login_result.success; 
}

export {login, login_result}
