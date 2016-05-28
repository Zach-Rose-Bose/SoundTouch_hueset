var hue = require("node-hue-api");
var hueapiBase = require("node-hue-api").HueApi;
var description = 'hueset_proto'
var hueIP = 'tbd';
var hueUser = 'tbd';
var hueapi = new hueapiBase();

hue.nupnpSearch(function(err, result) {
    if (err) {
        console.log(err.message);
    } else {
        hueIP = result[0].ipaddress;
        console.log('Bridge discovered. Press button on Hue Bridge now.')
        setTimeout(configureHue, 10000);
    }
    
});

function configureHue() {
    if(hueUser === 'tbd') {    
        hueapi.createUser(hueIP, description, function(err, user) {
            console.log('Awaiting Link Button Press...')
            if (err) {
                console.log(err.message);
                setTimeout(configureHue, 5000);
            } else {
                hueUser = JSON.stringify(user);
                console.log('hueUser set as:', hueUser);
                console.log('hueIP set as:', hueIP);
            }
            
        });
    } else {
        console.log('hueIP already set as:', hueUser);
    }
}