var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/insert', function(req, res, next) {
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var myobj = { name: "菜鸟教程", url: "www.runoob" };
        dbo.collection("site").insertOne(myobj, function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send('文档插入成功');
        });
    });
  // res.send('respond with a resource');
});

module.exports = router;
