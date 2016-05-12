var base = require('./Baser');
var ObjectId = base.ObjectId;
var NoticeSchema = new base.Schema({
    title: {type: String},
    creater_id: {
        type: ObjectId,
        ref: 'UserEntity'
    },
    ishide: {type: Number,default:0},
    detail: {type: String},
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now}//创建时间
});

var NoticeModel = base.mongoose.model('notice',NoticeSchema,'notice');

module.exports.NoticeModel = NoticeModel;