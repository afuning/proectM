var base = require('./Baser');
var ObjectId = base.ObjectId;
var TaskSchema = new base.Schema({
    name: {type: String},
    detail: {type: String},
    project_id: {
        type: ObjectId,
        ref: 'project'
    },
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
    forecastTime: {type:Date}//要求完成时间
});

var TaskModel = base.mongoose.model('task',TaskSchema,'task');

module.exports.TaskModel = TaskModel;