import config from "../config.js"; import { BaseModel } from "./base.js";

class Room extends BaseModel{    
    constructor(){
        super('quartos');
    }

    async read_by_user_id(user_id){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE id_do_usuario = ${user_id}`);
    }

    async read_by_name(name){
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE nome = ${name} LIMIT 1`)[0];
    }

    async exists({ name }){
        return this.read_with_nome(name);
    }
}

export default new Room();
