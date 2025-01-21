import postgres from "postgres";

import dotenv from "dotenv"

dotenv.config()

const rand_str = (len) =>{
    let out;

    let alph = ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'];
    let alph_len = alph.length-1;

    for(let i = 0; i < len; ++i){
        out += alph.at(Math.floor(Math.random() * alph_len));
    }

    return out;
}

const sql = postgres({
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 5432,
})

const config = {
    project_name: "Gerenciador de quartos",
    con: sql,
    rand_str
}

export default config 
