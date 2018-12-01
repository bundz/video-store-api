const UserModel = require(`../../models/user`);
const VideoModel = require(`../../models/video`);
const VideoCopyModel = require(`../../models/video-copy`);

const Database = {};

Database.clear = async () => {
  await VideoCopyModel.clear();
  await UserModel.clear();
  await VideoModel.clear();
};

module.exports = Database;