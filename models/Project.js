var base = require('./Baser');
var ObjectId = base.ObjectId;
var ProjectSchema = new base.Schema({
    name: {type: String},
    creater_id: {
        type: ObjectId,
        ref: 'UserEntity'
    },
    detail: {type: String},
    status: {type: Number,default: 0},
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now}//创建时间
});

var ProjectModel = base.mongoose.model('project',ProjectSchema,'project');

module.exports.ProjectModel = ProjectModel;