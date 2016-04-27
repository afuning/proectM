var base = require('./Baser');
var ObjectId = base.ObjectId;
var RoleSchema = new base.Schema({
    name: {type: String},
    department: {
        type: base.ObjectId,
        ref: 'department'
    },
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now}//创建时间
});


base.mongoose.model('role',RoleSchema,'role');
var RoleModel = base.mongoose.model('role');
module.exports.RoleModel = RoleModel;