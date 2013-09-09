var http = require('http'),
    mongo = require('mongoskin');

http.createServer(function (req, res) {
    var connect = function(dbName,next){
        var db = mongo.db(process.env.CUSTOMCONNSTR_MONGOLAB_URI + '/' + dbName, {safe : true});
        next(db);
    };

    connect("admin", function(db) {
        var out = [];

        db.admin.listDatabases(function(err, result){
            if (err) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('Err!' + JSON.stringify(err));
            }

            _.each(result.databases,function(item){
                out.push(item.name);
            });

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Hello, world!' + JSON.stringify(out));
            // res.json(out);
        });
    });
    
}).listen(process.env.PORT || 8080);