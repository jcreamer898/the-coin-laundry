
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var api = require('./routes/api');
var http = require('http');
var path = require('path')
var _ = require('underscore');
var oa = require('./utils/oauth');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ key: "coinlaundry", secret: "theleague", proxy: true }));
app.use(oa.checkLogin);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/oauth', routes.oauth);
app.get('/authorize', routes.authorize);
app.get('/users', user.list);

_.each(api, function(route, name) {
    route.get && app.get('/api/' + name, route.get);
    route.post && app.post('/api/' + name, route.post);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
