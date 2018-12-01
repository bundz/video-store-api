const Model = require(`../lib/model`);

class VideoCopy extends Model {
  constructor() {
    super(`video_copy`);
  }

  async findByVideoId(videoId, connection = null) {
    const sql = `SELECT * FROM ${this.tableName} WHERE video_id = ?`;
    return this.query(sql, [videoId], connection);
  }

  async deleteByUserIdAndVideoId(userId, videoId, connection = null) {
    const sql = `DELETE FROM ${this.tableName} WHERE user_id = ? AND video_id = ? LIMIT 1`;
    return this.query(sql, [userId, videoId]);
  }

}

module.exports = new VideoCopy();