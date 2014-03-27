var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , MongoStore = require("connect-mongodb")
  , settings = require("../settings");


var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: settings.cookiesSecret,
        store: new MongoStore({
            db: settings.db
        })
    }))
    app.use(app.router);//保留原来的
    //app.use(express.router(routes));//node.js开发指南上面的（注释掉）
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

routes(app);//这个是新加的

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});



module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { title: "首页" });
    });
    app.get("/reg", function (req, res) {
        res.render('reg', { title: "用户注册" });
    });
}
