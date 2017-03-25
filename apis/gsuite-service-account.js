//const keys = require("../config/keys.js");
const jwt = require('jsonwebtoken');
const request = require("request");
const Drive = require("./drive.js");

//will create JWT to send to GOOGLE and receive back access token
function createJWT() {

	//create JWT for the service account to access the organizational level google suite
	//EXAMPLE FROM GOOGLE DOCUMENTATION
	/*
				{"alg":"RS256","typ":"JWT"}.
				{
				"iss":"761326798069-r5mljlln1rd4lrbhg75efgigp36m78j5@developer.gserviceaccount.com",
				"scope":"https://www.googleapis.com/auth/prediction",
				"aud":"https://www.googleapis.com/oauth2/v4/token",
				"exp":1328554385,
				"iat":1328550785
				}.
				[signature bytes]
	*/

	//create space delimited string of service account scopes

	//first, save scopes as array, so can be easily modified
	const servAccScopes = [
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.readonly',
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/activity',
		'https://www.googleapis.com/auth/admin.directory.group',
		'https://www.googleapis.com/auth/admin.directory.group.member',
		'https://www.googleapis.com/auth/admin.directory.group.member.readonly',
		'https://www.googleapis.com/auth/admin.directory.group.readonly',
		'https://www.googleapis.com/auth/admin.directory.resource.calendar',
		'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
		'https://www.googleapis.com/auth/apps.groups.migration',
		'https://www.googleapis.com/auth/apps.groups.settings',
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/calendar.readonly',
		'https://www.googleapis.com/auth/contacts',
		'https://www.googleapis.com/auth/contacts.readonly',
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.appdata',
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/drive.metadata',
		'https://www.googleapis.com/auth/drive.metadata.readonly',
		'https://www.googleapis.com/auth/drive.photos.readonly', 
		'https://www.googleapis.com/auth/drive.readonly',
		'https://www.googleapis.com/auth/drive.scripts',
		'https://www.googleapis.com/auth/plus.login',
		'https://www.googleapis.com/auth/urlshortener',
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/youtube',
		'https://www.googleapis.com/auth/youtube.force-ssl',
		'https://www.googleapis.com/auth/youtube.readonly',
		'https://www.googleapis.com/auth/youtube.upload'
	];

	//join scopes into a string separated by a space to be encrypted and signed
	var scopes = servAccScopes.join(" ");

	//store basic Claim Set information as an object
	var payload = {
	  "iss": process.env.SERVICE_ACCOUNT,
	  "scope": scopes,
	  "aud":"https://www.googleapis.com/oauth2/v4/token"
	}

	//get our private key to sign our JWT
	var secret = process.env.PRIVATE_KEY;
	console.log('secret', secret);
	console.log('payload', payload);

	//sign() is jsonwebtoken function to encrypt to base64 header, claim set and secret
	var jsonWebToken = jwt.sign(payload, secret, { algorithm: 'RS256', expiresIn: '1h' });

	//make a post request to Google to retrieve access token
	getAccessToken(jsonWebToken).then((data)=>{

		console.log(data);

		data = JSON.parse(data);

		var accessToken = data.access_token;
		var tokenType = data.token_type;
		var expiresIn = data.expires_in;

		console.log(accessToken);

		Drive.listTeamDriveFiles(accessToken).then((success)=>{}).catch((err)=>{
			console.log(err);
		});

	}).catch((error)=>{

		//handle errors -----

	});

}

function getAccessToken(jsonWebToken) {

	return new Promise((resolve, reject)=>{
		//form data to be sent via request to Google to receive access_token
		var postData = {
	      	grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
	        assertion: jsonWebToken
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

		//call request --should this be a promise based function???

		request(options, function (err, res, body) {
			if (err) {
				//think through error handling
				reject(err);
			} else {
				//body includes access_token, token_type, expires_in for calling API
				resolve(body);
			}
		});

	})
}

createJWT();
//decide what will be exported
// module.exports = ;