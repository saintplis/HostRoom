import auth_route from "./auth.js";

let index_route = {};

index_route.get = async (request, response) => {
    response.send('Para uso interno');
}

export {
    index_route,
    auth_route
}
