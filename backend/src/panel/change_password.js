import User from "../models/user.js";
import validator from "../validators.js";

const change_pass_result = {
    success: 'Sucesso',
    invalid_data: 'Dados invalidos',
    invalid_pass: 'Senha invalida',
    bad_pass_length: 'Senha precisa ter no minimo 8 caracteres',
};

const change_password = async (user_id, old_pass, new_pass) => {
    const user_data = await User.read_by_id(user_id);

    if(!user_data){
        return change_pass_result.invalid_data;
    }

    if(!(await bcrypt.compare(old_pass, user_data.senha))){
        return change_pass_result.invalid_pass;
    }

    if(!validator.pass(new_pass)){
        return change_pass_result.bad_pass_length;
    }

    const hashed_pass = await bcrypt.hash(new_pass, 10);

    await User.update(user_data.id, {
        senha: hashed_pass 
    });

    return change_pass_result.success; 
}

export {change_pass_result, change_password}
