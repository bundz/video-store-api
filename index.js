const config = require(`./config`);
const database = require(`./lib/database`);

database.createPool(config.database);

const server = require(`./server`);

if (!process.env.TEST) {
  server.listen(3000, () => {
    console.log(`Video Store API, Server running...`);
  });
}
