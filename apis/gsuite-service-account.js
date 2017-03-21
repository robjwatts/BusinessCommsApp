const keys = require("../config/keys.js");
const jwt = require('jsonwebtoken');
const request = require("request");



function getServiceAccessToken() {

	//create JWT for the service account to access the organizational level google suite

	var payload = {
	  "iss": process.env.SERVICE_ACCOUNT,
	  "scope":"https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.readonly",
	  "aud":"https://www.googleapis.com/oauth2/v4/token"
	}

	var secret = process.env.PRIVATE_KEY;

	var token = jwt.sign(payload, secret, { algorithm: 'RS256', expiresIn: '1h' });

		console.log(token);

		var postData = {
          	grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
	        assertion: token
	    };

		var url = 'https://www.googleapis.com/oauth2/v4/token';

		var options = {
		  	method: 'post',
		  	url: url,
		  	headers: {
		    	'Content-Type': 'application/x-www-form-urlencoded'
		  	},
		  	form: postData
		}

		request(options, function (err, res, body) {
			if (err) {
				console.log('Error:' + err)
			} else {
				console.log(body)
			}
		});


}

module.exports = getServiceAccessToken;