import postgres from "postgres";

import dotenv from "dotenv"

import nodemailer from "nodemailer"

dotenv.config()

const rand_str = (len) =>{
    let out = "";

    let alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let alph_len = alph.length-1;

    for(let i = 0; i < len; ++i){
        out += alph.at(Math.floor(Math.random() * alph_len));
    }

    return out;
}

const cur_time_in_seconds = () =>{
    return Date.now() / 1000;
}

const sql = postgres({
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 5432,
})

const email = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secureConnection: false,  
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const config = {
    project_name: "Gerenciador de quartos",
    con: sql,
    email,
    rand_str,
    cur_time_in_seconds
}

export default config 
