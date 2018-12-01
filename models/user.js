const Joi = require(`joi`);
const Model = require(`../lib/model`);

const schema = {
  name: Joi.string().min(1).max(120),
  mail: Joi.string().email().min(5).max(100),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
};

class User extends Model {
  constructor() {
    super(`user`);
    this.schema = schema;
  }

  async findByMail(mail, connection = null) {
    const sql = `SELECT * FROM ${this.tableName} WHERE mail = ?`;
    return this.query(sql, [mail], connection);
  }
}

module.exports = new User();