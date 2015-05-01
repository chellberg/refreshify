#!/usr/bin/env node
/*eslint-disable */

var fromArgs      = require('watchify/bin/args.js');
var fs            = require('fs');
var path          = require('path');
var notifier      = require('node-notifier');
var refreshServer = require('../lib/refresh-server.js');
var clientSource  = fs.readFileSync(__dirname + '/../lib/client-source.js');

var PORT = 31415;
var REFRESH_SERVER_URL = 'http://localhost:' + PORT;

clientSource = [
    'window.REFRESH_SERVER_URL = "' + REFRESH_SERVER_URL + '";\n',
    clientSource
].join('');


refreshServer.listen(PORT);

var w = fromArgs(process.argv.slice(2));
w.setMaxListeners(Infinity);

var outfile = w.argv.o || w.argv.outfile;
var verbose = w.argv.v || w.argv.verbose;
var alwaysNotify = w.argv.n || w.argv.notifyall;
var customTitle = w.argv.m || w.argv.message;

if (!outfile) {
    console.error('You MUST specify an outfile with -o.');
    process.exit(1);
}

var dotfile = path.join(path.dirname(outfile), '.' + path.basename(outfile));

w.on('update', bundle);
bundle();

function notifyError(errorMessage) {
    console.error(errorMessage);
    notifier.notify({
        'title': 'ERROR!',
        'message': errorMessage
    });
}

function notify(message) {
    title = customTitle || 'Success!'
    notifier.notify({
        'title': title,
        'message': message
    });
}

function bundle () {
    var wb = w.bundle();
    wb.on('error', function (err) {
        notifyError(String(err));

        var writeStream = fs.createWriteStream(outfile);
        writeStream.on('error', notifyError);
        writeStream.on('end', refreshServer.refresh.bind(refreshServer));
        writeStream.write('window.BUNDLE_ERROR_MESSAGE = ' + JSON.stringify(String(err)) + ';\n');
        writeStream.write(clientSource);
    });

    var writeStream = fs.createWriteStream(dotfile);
    wb.pipe(writeStream);
    writeStream.write(clientSource);

    var bytes, time;
    w.on('bytes', function (b) { bytes = b; });
    w.on('time', function (t) { time = t; });
    
    wb.on('end', function () {
        fs.rename(dotfile, outfile, function (err) {
            if (err) return notifyError(err);

            var message = bytes + ' bytes written to ' + outfile + ' (' + (time / 1000).toFixed(2) + ' seconds)'
            if (verbose) {
                console.error(message);
            }
            if (alwaysNotify) {
              notify(message);
            }
            refreshServer.refresh();
        });
    });
}
