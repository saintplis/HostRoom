import bcrypt from 'bcrypt'
import User from "../models/user.js";

import validator from '../validators.js';
import {Roles} from '../models/roles.js';
import {create_code} from './email.js';

const register_result = {
    success: 'Sucesso',
    user_already_exists: 'Usuário ja existe',
    invalid_name: 'Um nome e um sobrenome sao necessarios',
    invalid_pass: 'Senha invalida',
    bad_pass_length: 'Senha precisa ter no minimo 8 caracteres',
    invalid_cpf: 'CPF invalido',
    invalid_phone_number: 'Numero de telefone invalido',
    invalid_birth_date: 'Data de nascimento invalida ou menor de 18'
};

const register = async (name, birth_date, cpf, email, pass, phone_number, emerg_phone_number) => {
    if(!validator.name(name)){
        return register_result.invalid_name;
    }

    cpf = cpf.split('')
        .filter(chr => chr >= '0' && chr <= '9')
        .join('');

    if(!validator.cpf_digs(cpf)){
        return register_result.invalid_cpf;
    }

    phone_number = phone_number.replace(/[^0-9]/g, '');

    if(!validator.phone_number_digs(phone_number)){
        return register_result.invalid_phone_number;
    }

    emerg_phone_number = emerg_phone_number.replace(/[^0-9]/g, '');

    if(emerg_phone_number !== "" && !validator.phone_number_digs(emerg_phone_number)){
        return register_result.invalid_phone_number;
    }

    if(!validator.birth_date(birth_date)){
        return register_result.invalid_birth_date; 
    }

    if(!validator.pass(pass)){
        return register_result.bad_pass_length;
    }

    if(await User.exists({
        email,
        cpf,
        phone_number
    })){
        return register_result.user_already_exists; 
    }

    let hashed_pass = await bcrypt.hash(pass, 10);

    let user_data = await User.create({
        nome: name,
        data_de_nascimento: birth_date,
        cpf: cpf,
        email: email,
        senha: hashed_pass,
        telefone: phone_number,
        telefone_emerg: emerg_phone_number,

        cargo: Roles.USER,
        admin: 0,
        validado: 0,
    });

    let result = await create_code(user_data);

    return result; 
}

export {register, register_result}
