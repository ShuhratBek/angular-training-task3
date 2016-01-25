var express = require('express');
var  app = express();

var  topRouters = [];

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var NodeCache = require("node-cache");
var myCache = new NodeCache();
var users = require('./data/users.json');
myCache.set("users", users);
var profiles = require('./data/profile.json');
myCache.set("profiles", profiles);

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
    var data = myCache.get('users'),
        //data = require('./data/users.json'),
        result = {},
        username = req.body.username,
        password = req.body.password,
        obj = data.users.filter(function (obj) {
            return (obj.username === username && obj.password === password);
        })[0],
        id = data.users.indexOf(obj);
    if(id > -1) {
        result.id = id;
        result.success = true;
    } else {
        result.success = false;
    }
    setTimeout(function() {
        res.send(result);
    }, 3000);
});
app.post('/forgot', function(req, res) {
    var data = myCache.get('users'),
        //data = require('./data/users.json'),
        result = {},
        username = req.body.username,
        obj = data.users.filter(function (obj) {
            return (obj.username === username);
        })[0],
        id = data.users.indexOf(obj);
    if(id > -1) {
        result.password = data.users[id].password;
        result.success = true;
    } else {
        result.success = false;
    }
    setTimeout(function() {
        res.send(result);
    }, 3000);
});
app.get('/getprofile/:id', function(req, res) {
    var data = myCache.get('profiles'),
        userCache = myCache.get('users'),
        result = {},
        id = req.params.id,
        profile = data.profiles[id];
    if(id > -1 && profile) {
        result.data = profile;
        result.data.password = userCache.users[id].password;
        result.success = true;
    } else {
        result.success = false;
    }
    //setTimeout(function() {
        res.send(result);
    //}, 3000);
});
app.post('/setprofile/:id', function(req, res) {
    var profileCache = myCache.get('profiles'),
        userCache = myCache.get('users'),
        result = {},
        id = req.params.id;
        console.log(req.body.age);
    if(req.body.age) {
        profileCache.profiles[id].age = req.body.age;
    }
    if(req.body.birthday) {
        profileCache.profiles[id].birthday = req.body.birthday;
    }
    if(req.body.greeting) {
        profileCache.profiles[id].greeting = req.body.greeting;
    }
    if(req.body.password) {
        userCache.users[id].password = req.body.password;
    }
    if(myCache.set('users', userCache) && myCache.set('profiles', profileCache)) {
        result.success = true;
    } else {
        result.success = false;
    }
    setTimeout(function() {
        res.send(result);
    }, 3000);
});
var  router = express.Router();

router.use('/', function(req, res, next) {
     next();
});

topRouters.splice(0, 0, express.static(__dirname));
app.listen(3000);

console.log('3000 port');