const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const utils = require(`../../test/utils`);
const UserController = require(`../../controllers/user`);
const server = require(`../../server`);
chai.use(chaiHttp);
const { expect, request } = chai;


describe(`Login Route`, () => {

  describe(`When executing login route with valid values`, () => {

    before(async () => {
      await utils.database.clear();
      await UserController.create({ name: `Jorrel Madeira`, mail: `jorel@gmail.com`, password: `jorel1234` });
    });

    it(`should return user`, async () => {

      const body = {
        mail: `jorel@gmail.com`,
        password: `jorel1234`
      };

      const res = await request(server)
        .post(`/auth/login`)
        .send(body);


      expect(res.body).to.have.property(`data`);
      expect(res.body.data).to.have.property(`id`);
      expect(res.body.data).to.have.property(`name`);
      expect(res.body.data.name).to.be.equals(`Jorrel Madeira`);
    });

  });

  describe(`When executing login route with invalid values`, () => {

    before(async () => {
      await utils.database.clear();
      await UserController.create({ name: `Jorrel Madeira`, mail: `jorel@gmail.com`, password: `jorel1234` });
    });

    it(`should return status 401`, async () => {

      const body = {
        mail: `jorel@gmail.com`,
        password: `jore000034`
      };

      const res = await request(server)
        .post(`/auth/login`)
        .send(body);
      
      expect(res.status).to.have.be.equals(401);
    });
    
  });

});