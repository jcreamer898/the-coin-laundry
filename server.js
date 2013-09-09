var http = require('http'),
    mongo = require('mongoskin');

http.createServer(function (req, res) {
    var connect = function(dbName, next){
        var db = mongo.db("mongodb://MongoLab-25:Zqy8wu31J5C6E9Dhxf6Q4t2cyf8ckVkS8dWrnCiMOvw-@ds027748.mongolab.com:27748/MongoLab-25/" + dbName, {safe : true});
        next(db);
    };

    connect("fantasy", function(db) {
        var out = [];

        console.log(db);

        db.collectionNames(function(err,collNames){
            if (err) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(JSON.stringify(err));
            }

            _.each(collNames, function(collName) {
                var cleanName = collName.name.replace(dbName + ".","");
                var formatted = {
                    name : cleanName,
                    details : dbName + "/" + cleanName,
                    database : dbName,
                    type : "collection"
                };

                if(cleanName != "system.indexes") out.push(formatted);
            });
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Hello, world!' + JSON.stringify(out));
        });
    });
    
}).listen(process.env.PORT || 8080);