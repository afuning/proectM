/**
 * Created by huning on 16/2/28.
 */
/*module.exports={
    mysql:{
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'projectM',
        port: 8889
    }
}*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projectM');//；连接数据库
var db = mongoose.connection;
db.on('error', console.error);
db.on('open', function() {
    console.log('连接成功');
});

var Schema = mongoose.Schema;   //  创建模型
var userSchema = new Schema({
    username: {type: String},
    password: {type: String}
}); //  定义了一个新的模型，但是此模式还未和user集合有关联
module.exports.userModel = mongoose.model('user', userSchema); //  与user集合关联
