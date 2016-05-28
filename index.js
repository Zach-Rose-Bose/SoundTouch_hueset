#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
var parseString = require('xml2js').parseString;
var stIP = process.env.stIP;

var client = new WebSocketClient();

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
                console.log(Object.getOwnPropertyNames(result.updates));
                if (result.updates && result.updates.hasOwnProperty('nowSelectionUpdated')) {
                    console.log(result.updates.nowSelectionUpdated);
                }
            });
        }
    });

});
console.log(stIP);
client.connect('ws://' + stIP, 'gabbo');