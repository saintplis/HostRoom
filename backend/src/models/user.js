import config from "../config.js";
import { BaseModel } from "./base.js";

class User extends BaseModel{    
    constructor(){
        super('usuarios');
    }

    async read_by_cpf(cpf){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE cpf = ${cpf} LIMIT 1`)[0];
    }
    
    async read_by_email(email){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE email = ${email} LIMIT 1`)[0];
    }

    async read_by_phone(phone){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE telefone = ${phone} LIMIT 1`)[0];
    }

    async read_with_email_or_cpf(id){
        let user_data = await this.read_by_email(id);

        if(!user_data){
            user_data = await this.read_by_cpf(id);
        }

        return user_data;
    }

    async exists({ email, cpf, phone_number }){
        if(cpf && (await this.read_by_cpf(cpf))){
            return true;
        }

        if(email && (await this.read_by_email(email))){
            return true;
        }

        if(phone_number && (await this.read_by_phone(phone_number))){
            return true;
        }

        return false;
    }
}

export default new User();
