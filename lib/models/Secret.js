const pool = require('../utils/pool');

class Secrets {
  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.created_at = row.created_at;
  }
  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM secrets
        `);
    return rows.map((secret) => new Secrets(secret));
  }



}

module.exports = { Secrets };
