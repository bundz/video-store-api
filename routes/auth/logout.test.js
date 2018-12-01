const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const server = require(`../../server`);
const utils = require(`../../test/utils`);
const UserController = require(`../../controllers/user`);

chai.use(chaiHttp);
const { expect }  = chai;

describe(`Logout Route Logout`, () => {
  describe(`when executing logout route after login`, () => {
    const agent = chai.request.agent(server);


    before(async () => {
      await utils.database.clear();
      await UserController.create({ name: `Jorrel Madeira`, mail: `jorel@gmail.com`, password: `jorel1234` });
      await agent.post(`/auth/login`).send({ mail: `jorel@gmail.com`, password: `jorel1234` });
    });

    it(`response should be success`, async () => {
      const res = await agent.get(`/auth/logout`);
      agent.close();
      expect(res).to.have.status(200);
    });
  });

  describe(`when executing logout route without login`, () => {
    const agent = chai.request.agent(server);

    it(`response should be success`, async () => {
      const res = await agent.get(`/auth/logout`);
      agent.close();
      expect(res).to.have.status(200);
    });
  });
});
