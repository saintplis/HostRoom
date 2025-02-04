import Fastify from "fastify";

import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";

import cors from '@fastify/cors'

import {auth_route, index_route, panel_route} from "./routes/index.js";
import config from "./config.js";

const app = Fastify({});

app.register(fastifyCookie);
app.register(fastifySession, {secret: config.rand_str(32)});
app.register(cors, {});

app.get('/', index_route.get);

app.post('/login', auth_route.login_post);
app.post('/register', auth_route.register_post);
app.post('/verify', auth_route.verify_post);
app.post('/panel/change_password', panel_route.change_pass_post);

app.listen({ port: 3000 }, (err,) => {
    if(err){
        console.log(err);
        process.exit(1)
    }
})
