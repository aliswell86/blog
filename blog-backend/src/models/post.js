const mongoose = require('mongoose');

const {Schema} = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedData: {
    type: Date,
    default: new Date() //현재 날짜를 기본으로 설정
  }
});

module.exports = mongoose.model('Post', Post);
