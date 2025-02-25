import Room from "../models/room.js";

const room_result = {
    success: 'Sucesso'
};

const get_rooms = async(user_id) => {
    return await Room.read_by_user_id(user_id);
}

export {get_rooms, room_result}
