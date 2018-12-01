const Model = require(`../lib/model`);

class Video extends Model {
  constructor() {
    super(`video`);
  }

  async list({ title, order, limit, offset }, connection = null) {

    const params = [`%${title}%`, limit, offset];

    const sql = `SELECT * FROM ${this.tableName} 
      WHERE title LIKE ? ORDER BY title ${order}
      LIMIT ? OFFSET ?`;
    return this.query(sql, params, connection);
  }

  async count({ title }, connection = null) {

    const params = [`%${title}%`];

    const sql = `SELECT COUNT(*) AS count FROM ${this.tableName} WHERE title LIKE ?`;
    return this.query(sql, params, connection);
  }
}

module.exports = new Video();