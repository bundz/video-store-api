const { expect } = require(`chai`);
const UserModel = require(`../../models/user`);
const route = require(`./create`);
const utils = require(`../../test/utils`);

describe(`User Create Route`, () => {

  describe(`When route with valid values`, () => {

    before(async () => {
      await utils.database.clear();
    });

    const req = {
      body: {
        name: `Jorel Maciel`,
        mail: `jorel@gmail.com`,
        password: `eusouojorel`
      }
    }

    const res = {};

    it(`should return true`, async () => {


      await route.route(req, res, () => {});
      expect(res.body).to.be.equals(true);
    });

    it(`and should save user in database`, async () => {
      const [user] = await UserModel.findByMail(req.body.mail);
      expect(user).to.have.all.keys(`id`, `name`, `mail`, `password`, `password_salt`, `created`);
      expect(user.name).to.be.equals(req.body.name);
      expect(user.mail).to.be.equals(req.body.mail);
    });
  });

});