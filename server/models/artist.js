var neo4j = require('neo4j');
var config = require('../config.json')

var db = new neo4j.GraphDatabase(config.neo4jURL);

var Artist = module.exports = function Artist(_node) {
    this._node = _node;
}

Artist.get = function (name, callback) {
    var query = [
        'MATCH (artist:Artist {name: {name}})',
        'RETURN artist',
    ].join('\n')

    var params = {
        name: name,
    };

    db.cypher({
        query: query,
        params: 'params',
    }, function (err, results) {
        if (err) return callback(err);
        if (!results.length) {
            err = new Error('No such artist with name: ' + name);
            return callback(err);
        }
        var artist = new Artist(results[0]['artist']);
        callback(null, artist);
    });
};

Artist.getAll = function (callback) {
    db.cypher({
        query: 'MATCH (artist:Artist) RETURN artist',
    }, function (err, results) {
        if (err) return callback(err);
        var artists = results.map(function (result) {
            return new Artist(result['artist']);
        });
        callback(null, artists);
    });
};