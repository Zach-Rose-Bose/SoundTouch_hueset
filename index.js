#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
var parseString = require('xml2js').parseString;
var hue = require("node-hue-api");
var stIP = process.env.stIP;

var client = new WebSocketClient();

var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

hue.nupnpSearch(function(err, result) {
    if (err) throw err;
    displayBridges(result);
});

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            parseString(message.utf8Data, function (err, result) {
                if (result.updates && result.updates.hasOwnProperty('nowSelectionUpdated')) {
                    if(result.updates.nowSelectionUpdated[0].preset[0].$.id == 1) {
                        console.log('yep, preset 1');
                    } else {
                        console.log('not 1, actually is:', result.updates.nowSelectionUpdated[0].preset[0].$.id);
                    }
                }
            });
        }
    });

});
console.log(stIP);
client.connect('ws://' + stIP, 'gabbo');