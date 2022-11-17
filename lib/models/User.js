const pool = require('../utils/pool');

class User {
  id;
  firstname;
  lastname;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.firstname = row.first_name;
    this.lastname = row.last_name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }
    
  static async insertUser({ firstname, lastname, email, passwordHash }) {
    const { rows } = await pool.query(`
        INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
    [firstname, lastname, email, passwordHash]
    );
    return new User(rows[0]);
  }
  static async getByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }
}

module.exports = { User };
