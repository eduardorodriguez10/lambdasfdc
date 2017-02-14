// simple test script

var nforce = require('./nforce');

var org = nforce.createConnection({
  clientId: process.env.EV_CLIENTID,
  clientSecret: process.env.EV_CLIENTSECRET,
  redirectUri: process.env.EV_CALLBACKURL,
  environment: process.env.EV_ENVIRONMENT,
  mode: 'single'
});

var username = process.env.EV_USERNAME;
var password = process.env.EV_PASSWORD;
// auth and run query
var recId;

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Salesforce skill.
    recId = event.queryStringParameters ? event.queryStringParameters.id : 'no-id';
    org.authenticate({ username: username, password: password }).then(function(){
        
        org.apexRest({ uri: process.env.EV_APEXREST, method: 'POST', body: recId});
    console.log('authenticated');
  });
};