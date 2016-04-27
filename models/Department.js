
var base = require('./Baser');
var ObjectId = base.ObjectId;
var DepartmentSchema = new base.Schema({
    name: {type: String},
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now}//创建时间
});

var DepartmentModel = base.mongoose.model("department",DepartmentSchema,'department');

module.exports.DepartmentModel = DepartmentModel;