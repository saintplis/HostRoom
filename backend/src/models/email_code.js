import config from "../config.js";
import { BaseModel } from "./base.js";

class EmailCode extends BaseModel{    
    constructor(){
        super('email_codigos');
    }

    async read_by_email(email){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE email = ${email}`);
    }

    async read_by_code(code){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE codigo = ${code} LIMIT 1`)[0];
    }

    async read_by_code_and_email(code, email){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE email = ${email} AND codigo = ${code} LIMIT 1`)[0];
    }
}

export default new EmailCode();
