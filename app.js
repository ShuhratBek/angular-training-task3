var express = require('express');
var  app = express();

var  topRouters = [];

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
     if (topRouters.length >  0) {
         var idx =  0;
         var nextRouter =  function  () {
             ++idx;
             if (idx <  topRouters.length) {
                 topRouters[idx](req, res, nextRouter);
             } else {
                 next();
             }
         };
        topRouters[idx](req, res, nextRouter);
     } else {
         next();
     }
 });

app.post('/login', function(req, res) {
    var data = require('./data/users.json');
    data = data.data;
    var result = {};
    var username = req.body.username;
    var password = req.body.password;
    var obj = data.filter(function (obj) {
        return (obj.username === username && obj.password === password);
    })[0];
    var id = data.indexOf(obj);
    if(id > -1) {
        result.id = id;
        result.success = true;
    } else {
        result.success = false;
    }
    //console.log(req.body);
    res.send(result);
});
app.post('/forgot', function(req, res) {
    var data = require('./data/users.json');
    data = data.data;
    var result = {};
    var username = req.body.username;
    var obj = data.filter(function (obj) {
        return (obj.username === username);
    })[0];
    var id = data.indexOf(obj);
    if(id > -1) {
        result.password = data[id].password;
        result.success = true;
    } else {
        result.success = false;
    }
    res.send(result);
});
app.get('/getprofile/:id', function(req, res) {
    var data = require('./data/profile.json');
    data = data.data;
    var result = {};
    var id = req.params.id;
    if(id > -1) {
        result.data = data[id];
        result.success = true;
    } else {
        result.success = false;
    }
    res.send(result);
});
var  router = express.Router();

router.use('/', function(req, res, next) {
     next();
 });

topRouters.splice(0, 0, express.static(__dirname));
app.listen(3000);

console.log('3000 port');