
var base = require('./Baser');
var ObjectId = base.ObjectId;
var UserSchema = new base.Schema({
    username: {type: String},
    password: {type: String},
    realname: {type: String,default:'未知'},
    role: {
        type: ObjectId,
        ref: 'role'
    },
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now}//创建时间
});

var UserModel = base.mongoose.model('UserEntity',UserSchema,'user');

module.exports.UserModel = UserModel;