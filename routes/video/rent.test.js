const { expect } = require(`chai`);
const VideoModel = require(`../../models/video`);
const UserModel = require(`../../models/user`);
const UserController = require(`../../controllers/user`);
const rent = require(`./rent`);
const utils = require(`../../test/utils`)

describe(`Rent Video Route`, () => {

  describe(`when executing rent route with valid`, () => {

    let id;
    let user;

    before(async () => {
      await utils.database.clear();
      const { insertId } = await VideoModel.create({title: `Pulp Fiction`, director: `Quentin Tarantino`, copies: 1 });
      await UserController.create({ name: `Jorrel Madeira`, mail: `jorel@gmail.com`, password: `jorel1234` });
      [ user ] = await UserModel.findByMail(`jorel@gmail.com`);
      id = insertId;
    });
    
    it(`it should return true`, async () => {
      const req = {
        params: {
          id
        },
        user
      };

      const res = {};
      await rent.route(req, res, () => {});

      expect(res.body).to.be.equals(true);
    });

    it(`if try again it should throw an error`, async () => {
      const req = {
        params: {
          id
        },
        user
      };

      const res = {};
      let error;

      try {
        await rent.route(req, res, () => {});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.an.instanceof(Error);
    });

    it(`if try again it invalid id should throw an error`, async () => {
      const req = {
        params: {
          id: 9999999
        },
        user
      };

      const res = {};
      let error;

      try {
        await rent.route(req, res, () => {});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.an.instanceof(Error);
    });

  });
});