/**
 * Created by huning on 16/3/16.
 */
var mongodb = require('../conf/db.js');
var mongoose = mongodb.mongoose;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObejectId;

exports.mongodb = mongodb;//导出mongodb
exports.mongoose = mongoose; //导出mongoose
exports.Schema = Schema;//导出Schema
exports.ObjectId = ObjectId;//导出ObjectId
exports.Mixed = Schema.Types.Mixed;//导出Mixed