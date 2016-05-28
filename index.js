#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
var parseString = require('xml2js').parseString;
var hue = require("node-hue-api");
var hueapiBase = require("node-hue-api").HueApi;
var stIP = process.env.stIP;
var hueIP = process.env.hueIP;
var hueUser = process.env.hueUser;
var client = new WebSocketClient();
var lightState = hue.lightState;

var hueapi = new hueapiBase(hueIP, hueUser);

var stateCO = lightState.create().on().rgb(99,147,237).bri(255); // Cornflower
var stateCT = lightState.create().on().rgb(127,255,0).bri(255); // Chartreuse
var stateF = lightState.create().on().rgb(255,0,255).bri(255); // Fuschia

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
                        console.log('preset 1, cornflower');
                        hueapi.setLightState(1, stateCO, function(err, lights) {
                            if (err) throw err;
                            console.log(lights);
                        });
                    } else if(result.updates.nowSelectionUpdated[0].preset[0].$.id == 2) {
                        console.log('preset 2, fuschia');
                        hueapi.setLightState(1, stateF, function(err, lights) {
                            if (err) throw err;
                            console.log(lights);
                        });
                    } else if(result.updates.nowSelectionUpdated[0].preset[0].$.id == 3) {
                        console.log('preset 3, chartreuse');
                        hueapi.setLightState(1, stateCT, function(err, lights) {
                            if (err) throw err;
                            console.log(lights);
                        });
                    } else {
                        console.log('not a hueset. Preset detected:', result.updates.nowSelectionUpdated[0].preset[0].$.id);
                    }
                }
            });
        }
    });

});
console.log(stIP);
client.connect('ws://' + stIP, 'gabbo');