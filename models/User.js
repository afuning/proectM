
var base = require('./Baser');
var ObjectId = base.ObjectId;
var UserSchema = new base.Schema({
    username: {type: String},
    password: {type: String},
    lastLoginTime:Date,//最后登陆时间
    createTime:{type:Date,default:Date.now}//创建时间
});

var UserModel = base.mongoose.model("UserEntity",UserSchema,'user');

module.exports.UserModel = UserModel;