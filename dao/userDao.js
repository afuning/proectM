/**
 * Created by huning on 16/2/28.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSql');


//使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//向前台返回json的封装
var jsonWrite = function(res,ret){
    if(typeof ret =='undefined'){
        res.json =({
            code:'500',
            msg:'操作失败'
        });
    }else{
        console.dir(ret);
        res.json =(ret);
    }
};

module.exports={
    add: function(req,res,next){
        //console.dir(pool.getConn);
        pool.getConnection(function(err,connection){
            //获取url参数
            var params = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)'
            connection.query($sql.insert,[params.name,params.age],function(err,result){
                if(result){
                    result = {
                        "code": '200',
                        "msg":'增加成功'
                    };
                }
                //以json形式，把操作返回给前端
                jsonWrite(res,result);

                //释放连接
                connection.release();
            })
        })
    }
}
