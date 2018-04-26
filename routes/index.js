var express = require('express');
var router = express.Router();

var User = require('../models/User');// 引入模型

router.get('/',function(req,res,next){
    res.render('login');
});

router.get('/submit',(req,res,next)=>{
    console.log('get请求参数对象 :',req.query);
    console.log('post请求参数对象 :',req.body);
    // var user = new User({
    //     username:'admin',
    //     password:'123'
    // });
    // user.save((err)=>{ //添加
    //     console.log('save status:', err ? 'failed' : 'success');
    // });

    // User.find({ //查找
    //     username:'admin',
    //     passWord:'123'
    // },(err, docs)=>{
    //     if(err){
    //         res.send('server or db error');
    //     }else{
    //         console.log('登录成功用户：'+docs);
    //         if(docs.length==0){
    //             res.send('用户名或密码有误');
    //         }else{
    //             req.session.user = {
    //                 _id:docs[0]._id,
    //                 username:docs[0].username
    //             };
    //             res.send('login success');
    //         }
    //     }
    // });

    User.findOne(req.query,(err, doc)=>{
        if(err){
            var result = {'code': '10001',
                'message': 'server or db error'
            };
            res.send(result);
        }else{
            console.log('登录成功用户：'+doc);
            if(doc === null){
                var result = {'code': '10002',
                    'message': '用户名或密码有误'
                };
                res.send(result);
            }else{
                // console.log(req.session)
                req.session.user = {
                    _id:doc._id,
                    username:doc.username
                };
                var result = {'code': '10000',
                    'message': '登录成功',
                    'result': doc
                };
                res.send(result);
            }
        }
    })

});

router.post('/register',(req,res,next)=>{
     console.log('get请求参数对象 :',req.query);
     console.log('post请求参数对象 :',req.body);
     var user = new User(req.body);
     user.save((err)=>{ // 添加
         console.log('save status:', err ? 'failed' : 'success');
         if (err) {
             var result = {'code': '10001',
                 'message': 'server or db error'
             };
             res.send(result);
         } else {
             var result = {'code': '10000',
                 'message': '注册成功'
             };
             res.send(result);
         }
     });
});

module.exports = router;