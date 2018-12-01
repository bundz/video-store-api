const crypto = require(`crypto`);

const crypt = {};

crypt.hashPassword = (password) => {
  const salt = crypto.randomBytes(128).toString('base64');
  const iterations = 10000;
  const hash = pbkdf2(password, salt, iterations);

  return {
      salt,
      hash,
      iterations
  };
};

crypt.validatePassword = (hash, salt, iterations, password) => {
  return hash === crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations);
};

module.exports = crypt;