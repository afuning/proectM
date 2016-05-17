/**
 * Created by huning on 16/3/10.
 */
var io = require('socket.io')();
var LetterModel = require('../models/Letter').LetterModel;
var eventproxy =require('eventproxy');
io.on('connection', function(socket){
    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向对方广播发布的消息
        var screen = {
            $or: [
                {to_id:obj.to,from_id:obj.from},
                {to_id:obj.from,from_id:obj.to}
            ],
            ishide: {$ne:1}
        }
        LetterModel.findOne(screen).populate({path: 'to_id from_id dialogue.to dialogue.from'}).exec(function(err,doc){
            var dialogue = [];
            if(!doc){
                dialogue.push(obj);
                var letterEntity = new LetterModel({
                    from_id: obj.from,
                    to_id: obj.to,
                    dialogue: dialogue
                });
                letterEntity.save(function(err,letter){
                    console.log(letter);
                    letter.populate({path: 'to_id from_id dialogue.to dialogue.from'},function(err, populatedDoc){
                        io.emit(obj.to, populatedDoc.dialogue[populatedDoc.dialogue.length-1]);
                    })
                })
            }else {
                var doc_id = doc._id;
                doc.dialogue.push(obj);
                doc.updateTime = Date.now();
                doc.isRead = 0;
                delete doc._id;
                LetterModel.update({_id:doc_id},doc).exec(function(){
                    LetterModel.findById({_id: doc_id}).populate({path: 'to_id from_id dialogue.to dialogue.from'}).exec(function(err,letter){
                        io.emit(obj.to, letter.dialogue[letter.dialogue.length-1]);
                    })
                });
            }
            console.log(obj.from+'说：'+obj.content+'对'+obj.to);
        })
    });
});

exports.listen = function (_server) {
    return io.listen(_server);
};





