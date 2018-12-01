const { expect } = require(`chai`);
const VideoModel = require(`../../models/video`);
const list = require(`./list`);

describe(`List Video Route`, () => {

  describe(`when executing list route with 3 videos in database`, () => {

    before(async () => {
      await VideoModel.create({title: `Pulp Fiction`, director: `Quentin Tarantino`, copies: 10 });
      await VideoModel.create({title: `The Holy Montain`, director: `Alejandro Jodorowsky`, copies: 5 });
      await VideoModel.create({title: `Clockwork Orange`, director: `Stanley Kubrick`, copies: 5 });
    });
    
    it(`it should return ascendent order`, async () => {
      const req = {
        query: {
          title: ``,
          order: `asc`,
          limit: 15,
          offset: 0
        }
      };

      const res = {};

      await list.route(req, res, () => {});

      expect(res.body).to.have.all.keys(`data`, `pagination`);
      expect(res.body.data).to.have.lengthOf(3);
      expect(res.body.data[0].title).to.be.equals(`Clockwork Orange`);
      expect(res.body.data[1].title).to.be.equals(`Pulp Fiction`);
      expect(res.body.data[2].title).to.be.equals(`The Holy Montain`);
    });

    it(`it should return descendent order`, async () => {
      const req = {
        query: {
          title: ``,
          order: `desc`,
          limit: 15,
          offset: 0
        }
      };

      const res = {};

      await list.route(req, res, () => {});

      expect(res.body).to.have.all.keys(`data`, `pagination`);
      expect(res.body.data).to.have.lengthOf(3);
      expect(res.body.data[2].title).to.be.equals(`Clockwork Orange`);
      expect(res.body.data[1].title).to.be.equals(`Pulp Fiction`);
      expect(res.body.data[0].title).to.be.equals(`The Holy Montain`);
    });

    it(`with title Clockwork`, async () => {
      const req = {
        query: {
          title: `Clockwork`,
          order: `asc`,
          limit: 15,
          offset: 0
        }
      };

      const res = {};

      await list.route(req, res, () => {});

      expect(res.body).to.have.all.keys(`data`, `pagination`);
      expect(res.body.data).to.have.lengthOf(1);
      expect(res.body.data[0].title).to.be.equals(`Clockwork Orange`);
    });

    it(`with not found title`, async () => {
      const req = {
        query: {
          title: `Lion King`,
          order: `asc`,
          limit: 15,
          offset: 0
        }
      };

      const res = {};

      await list.route(req, res, () => {});

      expect(res.body).to.have.all.keys(`data`, `pagination`);
      expect(res.body.data).to.have.lengthOf(0);
    });

  });

});