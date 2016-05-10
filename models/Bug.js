var base = require('./Baser');
var ObjectId = base.ObjectId;
var BugSchema = new base.Schema({
    name: {type: String},
    detail: {type: String},
    project_id: {
        type: ObjectId,
        ref: 'project'
    },
    schedule_user:[{
        type: ObjectId,
        ref: 'UserEntity'
    }],
    rank: {type: Number},
    schedule_detail: [{type: String}],
    schedule_time: [{type:Date}],
    from_id: [{
        type: ObjectId,
        ref: 'UserEntity'
    }],
    to_id: {
        type: ObjectId,
        ref: 'UserEntity'
    },
    endTime: {type:Date},
    status: {type: Number,default: 0},
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now},//创建时间
});

var BugModel = base.mongoose.model('bug',BugSchema,'bug');

module.exports.BugModel = BugModel;