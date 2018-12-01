const mysql = require(`mysql2/promise`);

const Database = {};

Database.createPool = database => {
  Database.dbConnectionPool = mysql.createPool({
    host: database.host,
    user: database.user,
    database: database.name,
    password: database.password,
    charset: `utf8mb4`
  });
};

Database.execute = async (query, params) => {
  const connection = await Database.dbConnectionPool.getConnection();

  try {
    return await connection.execute(query, params);
  } finally {
    connection.release();
  }
};

Database.executeTransaction = async executor => {
  const connection = await Database.dbConnectionPool.getConnection();

  try {
    await connection.beginTransaction();

    try {
      const result = await executor(connection);
      await connection.commit();
      return result;
    } catch (err) {
      try {
        await connection.rollback();
      } catch (errRollback) {
        /* Ignore rollback error. */
      }
      throw err;
    }
  } finally {
    connection.release();
  }
};

module.exports = Database;
