var process = require('child_process');
var fs = require('fs');
var path = require('path');
var util = require('util')

let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "publish.json")).toString())

const less_path = path.resolve(__dirname, "../media/less");
const css_path = path.resolve(__dirname, "../../dist/media");
const plugin_path = path.resolve(__dirname, "../plugins");
const plugin_dist_path = plugin_path.replace("src", "dist");

config['less'].forEach(file => {
    const cmd = "lessc " + path.join(less_path, file) + " " + path.join(css_path, file.replace(".less", ".css"));
    console.log(cmd);
    process.exec(cmd, function(err, stdout, stderr) {
        if (err) {
            console.error(err);
        }
    })
});

config['markdown-it'].forEach(file => {
    file = file + ".js";
    const cmd = "copy " + path.join(plugin_path, file) + " " + path.join(plugin_dist_path, file);
    console.log(cmd);
    process.exec(cmd, function(err, stdout, stderr) {
        if (err) {
            console.error(err);
        }
    })
});

// fs.readdirSync(less_path).forEach(function (name) {
//     if (name.indexOf(".less") != -1) {
//         const cmd = "lessc " + path.join(less_path, name) + " " + path.join(css_path, name.replace(".less", ".css"));
//         console.log(cmd);
//         process.exec(cmd, function (err, stdout, stderr) {
//             if (err) {
//                 console.error(err);
//             }
//         });
//     }
// })
