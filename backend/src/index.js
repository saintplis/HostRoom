import Fastify from "fastify";

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import {auth_route, index_route, panel_route} from "./routes/index.js";
import config from "./config.js";

const app = Fastify({});
app.register(cors, {});
app.register(jwt, {secret: config.rand_str(32)})

const disallow_auth = async (request, reply) => {
    try {
        await request.jwtVerify();

        return reply.code(403).send({ error: "Ja logado" });
    } catch (err) {

    }
};

app.get('/', index_route.get);

app.post('/login', { preValidation: disallow_auth }, auth_route.login_post);
app.post('/register', { preValidation: disallow_auth }, auth_route.register_post);
app.post('/verify', { preValidation: disallow_auth }, auth_route.verify_post);

app.post('/forgot_password', { preValidation: disallow_auth }, auth_route.forgot_password_post);
app.post('/forgot_change_password', { preValidation: disallow_auth }, auth_route.forgot_change_password_post);

app.post('/panel/change_password', panel_route.change_pass_post);
app.get('/panel/rooms', panel_route.fetch_rooms_get);

app.get('/panel/self', panel_route.fetch_self_get);
app.post('/panel/self', panel_route.update_self_post);

app.listen({ port: 3000 }, (err,) => {
    if(err){
        console.log(err);
        process.exit(1)
    }
})
