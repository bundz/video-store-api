const express = require(`express`);
const bodyParser = require(`body-parser`);
const helmet = require(`helmet`);
const passport = require(`passport`);
const cors = require(`cors`);
const cookieParser = require(`cookie-parser`)
const session = require(`express-session`)
const responseMiddleware = require(`./middlewares/response`);
const errorMiddleware = require(`./middlewares/error`);
const server = express();
const passportSetup = require(`./lib/passport`);
server.use(cors());

passportSetup(passport);
server.use(passport.initialize());
server.use(passport.session());
server.use(responseMiddleware);
server.use(cookieParser());
server.use(bodyParser.json({ limit: `30mb` }));
server.use(bodyParser.urlencoded({ limit: `30mb`, extended: true }));
server.use(helmet());
server.use(session({ secret: `itssecretashell` }));

server.use(`/`, require(`./routes`));

server.use(errorMiddleware);

module.exports = server;
