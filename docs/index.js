'use strict';

const express = require('express');
const app = express();

app.use(express.static('public'));

let port = process.env.PORT || 9000;

app.listen(port, function () {
  console.log(`
  - Listening on: http://localhost:${port}
  `)
});
