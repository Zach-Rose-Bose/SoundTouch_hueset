var hue = require("node-hue-api");
var hueapiBase = require("node-hue-api").HueApi;
var description = 'hueset_proto'
var hueIP = 'tbd';
var hueUser = 'tbd';
var hueapi = new hueapiBase();

hue.nupnpSearch(function(err, result) {
    if (err) throw err;
    hueIP = result[0].ipaddress;
    console.log('hueIP set as:', hueIP);
    console.log('Press button on Hue Bridge now.')
    configureHue();
});

function configureHue() {
    if(hueUser === 'tbd') {    
        hueapi.createUser(hueIP, description, function(err, user) {
            console.log('Awaiting Link Button Press...')
            if (err) {
                console.log(err.message);
                setTimeout(configureHue, 1000);
            } else {
                console.log(JSON.stringify(user));
                console.log('hueIP set as:', hueUser);
            }
            
        });
    } else {
        console.log('hueIP already set as:', hueUser);
    }
}