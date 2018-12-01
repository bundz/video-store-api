const VideoModel = require(`../models/video`);
const ApiError = require(`../lib/api-error`);
const consts = require(`../config/consts`);
const config = require(`../config`);
const VideoCopyController = require(`./video-copy`);

const VideoController = {};

VideoController.list = async ({ title, order, limit, offset}) => {
  const videos = await VideoModel.list({ title, order, limit, offset });
  const [{ count }] = await VideoModel.count({ title, order });
  return { videos, count };
};

VideoController.rent = async (user, videoId) => {
  return VideoModel.executeTransaction(async connection => {
    const [video] = await VideoModel.findById(videoId, connection);

    if(!video) {
      throw ApiError.NotFound(`Video Not Found`, {
        errno: consts.ERR_VIDEO_NOT_FOUND
      });
    }

    await VideoCopyController.create(user.id, video.id, connection);

    const copiesRented = await VideoCopyController.findByVideoId(video.id, connection);

    if(copiesRented.length > video.copies) {
      throw ApiError.BadRequest(`All copies rented`, {
        errno: consts.ERR_VIDEO_ALL_COPIES_RENTED
      });
    }

    return true;
  });
}
;
VideoController.return = async(user, videoId) => {
  const [video] = await VideoModel.findById(videoId);

  if(!video) {
    throw ApiError.NotFound(`Video Not Found`, {
      errno: consts.ERR_VIDEO_NOT_FOUND
    });
  }

  await VideoCopyController.deleteByUserIdAndVideoId(user.id, videoId);

  return true;
};

module.exports = VideoController;