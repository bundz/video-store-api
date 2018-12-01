const database = require(`./database`);

class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async query(sql, params, connection = null) {
    if (!connection) {
      connection = database;
    }

    const [rows] = await connection.execute(sql, params);
    return rows;
  }

  async list(connection = null) {
    const sql = `SELECT * FROM ${this.tableName};`;
    return this.query(sql, [], connection);
  }

  async count(connection = null) {
    const sql = `SELECT COUNT(*) FROM ${this.tableName};`;
    return this.query(sql, [], connection);
  }

  async findById(id, connection = null) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?;`;
    return this.query(sql, [id], connection);
  }

  async create(data, connection = null) {
    const keys = Object.keys(data);
    const params = Object.values(data);
    const sql = `INSERT INTO ${this.tableName} (${keys.join(`,`)}) VALUES (${Array(keys.length)
      .fill(`?`)
      .join(`,`)})`;
    return this.query(sql, params, connection);
  }

  async update(uid, data, connection = null) {
    const keys = Object.keys(data).map(item => `${item} = ?`);
    const params = Object.values(data);
    params.push(uid);
    const sql = `UPDATE ${this.tableName} SET ${keys.join(`,`)} WHERE \`uid\` = ?`;
    return this.query(sql, params, connection);
  }

  async clear(connection = null) {
    if (!process.env.TEST) return;

    const sql = `DELETE FROM ${this.tableName}`;
    return this.query(sql, [], connection);
  }
}

Model.prototype.executeTransaction = database.executeTransaction;

module.exports = Model;
