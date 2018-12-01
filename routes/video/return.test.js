const { expect } = require(`chai`);
const VideoModel = require(`../../models/video`);
const UserModel = require(`../../models/user`);
const UserController = require(`../../controllers/user`);
const VideoController = require(`../../controllers/video`);
const returnRoute = require(`./return`);
const utils = require(`../../test/utils`)

describe(`Return Video Route`, () => {

  describe(`when executing return route with valid values`, () => {

    let id;
    let user;

    before(async () => {
      await utils.database.clear();
      const { insertId } = await VideoModel.create({title: `Pulp Fiction`, director: `Quentin Tarantino`, copies: 1 });
      await UserController.create({ name: `Jorrel Madeira`, mail: `jorel@gmail.com`, password: `jorel1234` });
      [ user ] = await UserModel.findByMail(`jorel@gmail.com`);
      id = insertId;
      await VideoController.rent(user, id);
    });
    
    it(`it should return true`, async () => {
      const req = {
        params: {
          id
        },
        user
      };

      const res = {};
      await returnRoute.route(req, res, () => {});

      expect(res.body).to.be.equals(true);
    });

    it(`if try again it should return true`, async () => {
      const req = {
        params: {
          id
        },
        user
      };

      const res = {};
      await returnRoute.route(req, res, () => {});

      expect(res.body).to.be.equals(true);
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
        await returnRoute.route(req, res, () => {});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.an.instanceof(Error);
    });

  });
});