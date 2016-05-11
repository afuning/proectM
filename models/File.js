var base = require('./Baser');
var ObjectId = base.ObjectId;
var FileSchema = new base.Schema({
    title: {type: String},
    creater_id: {
        type: ObjectId,
        ref: 'UserEntity'
    },
    file: [{
        key: {type: String},
        name: {type: String},
        type: {type: String},
        size: {type: String},
        url: {type: String}
    }],
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now}//创建时间
});

var FileModel = base.mongoose.model('file',FileSchema,'file');

module.exports.FileModel = FileModel;