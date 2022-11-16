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
    

    

}

module.exports = { User }