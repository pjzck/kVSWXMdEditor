var process = require('child_process');
var fs = require('fs');
var path = require('path');
var util = require('util')

const less_path = path.resolve(__dirname, "../media/less");
const css_path = path.resolve(__dirname, "../media/css");
const relative_pattern = '<link href="media/css/%s" rel="stylesheet" />';
const files = []

fs.readdirSync(less_path).forEach(function(name) {
    if (name.indexOf(".less") != -1) {
        const cmd = "lessc " + path.join(less_path, name) + " " + path.join(css_path, name.replace(".less", ".css"));
        console.log(cmd);
        process.exec(cmd, function(err, stdout, stderr) {
            if (err) {
                console.error(err);
            }
        });

        files.push(util.format(relative_pattern, name.replace(".less", ".css")))
    }
})

var ff = fs.openSync(path.resolve(__dirname, "../media/css/css_list"), "w")
fs.writeSync(ff, files.join('\n'))

// process.execSync()