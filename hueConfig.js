var hue = require("node-hue-api");
var hueapiBase = require("node-hue-api").HueApi;
var description = 'hueset_proto'
var hueIP = 'tbd';
var hueUser = 'tbd';
var hueapi = new hueapiBase();

hue.nupnpSearch(function(err, result) {
    if (err) throw err;
//     result = JSON.stringify(result)
    console.log(result[0]);
    hueIP = result[0].ipaddress;
    console.log('hueIP set as:', hueIP);
    console.log('Press button on Hue Bridge now.')
    configureHue();
});

function configureHue() {
    if(hueUser === 'tbd') {
        console.log('getting user...')
        hueapi.createUser(hueIP, description, function(err, user) {
            if (err) throw err;
            console.log(JSON.stringify(user));
        });
    } else {
        console.log('hueIP set as:', hueUser);
    }

}