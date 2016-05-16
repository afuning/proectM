
var base = require('./Baser');
var ObjectId = base.ObjectId;
var LetterSchema = new base.Schema({
    from_id: {
        type: ObjectId,
        ref: 'UserEntity'
    },
    to_id: {
        type: ObjectId,
        ref: 'UserEntity'
    },
    dialogue: [{
        time:{type: Date},
        user: {
            type: ObjectId,
            ref: 'UserEntity'
        },
        content: {type: String}
    }],
    ishide: {type: Number,default:0},
    isRead: {type: Number,default:0},
    updateTime:{type:Date,default:Date.now},//最后修改时间
    createTime:{type:Date,default:Date.now}//创建时间
});

var LetterModel = base.mongoose.model('letter',LetterSchema,'letter');

module.exports.LetterModel = LetterModel;