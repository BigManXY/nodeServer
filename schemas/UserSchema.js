var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 创建 Schema
var userSchema = new Schema({
    username:String,
    password:String
})
module.exports = userSchema;