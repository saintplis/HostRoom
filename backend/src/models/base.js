import config from "../config.js";

export class BaseModel {
    constructor(data){
        this.data = data;
    }

    async read_all() {
        let con = config.con;

        return await con`SELECT * FROM ${con(this.data)}`;
    }

    async read_by_id(id) {
        let con = config.con;

        return (await con`SELECT * FROM ${con(this.data)} WHERE id = ${id} LIMIT 1`)[0];
    }

    async create(data) {
        let con = config.con;

        return (await con`INSERT INTO ${con(this.data)} ${con(data)} RETURNING *`)[0];
    }

    async update(id, data) {
        let con = config.con;
        
        return (await con`UPDATE ${con(this.data)} SET ${con(data)} WHERE id = ${id} RETURNING *`)[0];
    }

    async delete(id) {
        let con = config.con;

        return await con`DELETE FROM ${con(this.data)} WHERE id = ${id}`;
    }
}
