/**
 * Created by huning on 16/4/27.
 */
var jade = require('jade');
var fs = require('fs');
var path = require("path");
var _cwd = process.cwd();
var _ = require('lodash');

var sourcePath = _cwd + '/views/template';
var targetPath = _cwd + '/public/template';
var targetFileName = 'jade-template.js';
function compiler() {
    //mkdirSync(targetPath);
    fs.readdir(sourcePath, function (err, files) {
        var allFunctions = [];
        _.forEach(files, function (file) {
            var jsFunctionString = jade.compileFileClient(sourcePath + '/' + file, {name: path.basename(file, '.jade').replace(/-/g, '_') + '_template'});
            allFunctions.push(jsFunctionString);
        });
        fs.writeFileSync(targetPath + '/' + targetFileName, allFunctions.join('\r\n'));
        console.log('compile jade template successfully: ' + targetPath + '/' + targetFileName);
    });
}

var mkdirSync = function (dirpath, mode) {
    dirpath.split('\/').reduce(function (pre, cur) {
        var p = path.resolve(pre, cur);
        if (!fs.existsSync(p)) fs.mkdirSync(p, mode || 0755);
        return p;
    }, __dirname);
};


module.exports = compiler();