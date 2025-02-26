import User from "../models/user.js";

const self_result = {
    success: 'Sucesso'
};

const get_self = async(user_id) => {
    return await User.read_by_id(user_id);
}

export {self_result, get_self}
