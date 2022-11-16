const pool = require('../utils/pool');

class User {
    id;
    firstname;
    lastname;
    email;
    #passwordhash;

    constructor(user) {
        this.id = user.id;
        this.firstname = user.first_name;
        this.lastname = user.last_name;
        this.email = user.email;
        this.#passwordhash = user.password_hash;
    }
    
    static async insertUser({ id, firstname, lastname, email, passwordhash }) {
        const { rows } = await pool.query(`
        INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
            [firstname, lastname, email, passwordhash]
        );
        return new User(rows[0]);
}


}

module.exports = { User }