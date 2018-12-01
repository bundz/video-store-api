const VideoCopyModel = require(`../models/video-copy`);
const ApiError = require(`../lib/api-error`);
const consts = require(`../config/consts`);
const config = require(`../config`);

const VideoCopyController = {};

VideoCopyController.create = async (userId, videoId, connection) => {
  await VideoCopyModel.create({ user_id: userId, video_id: videoId }, connection);
  return true;
};

VideoCopyController.findByVideoId = async (videoId, connection) => {
  return VideoCopyModel.findByVideoId(videoId, connection);
};

VideoCopyController.deleteByUserIdAndVideoId = async (userId, videoId) => {
  return VideoCopyModel.deleteByUserIdAndVideoId(userId, videoId);
};

module.exports = VideoCopyController;