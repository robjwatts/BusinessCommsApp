const request = require('request');
const passport = require('passport');

// function getRefreshToken(userId) {

// 	return new Promise((resolve, reject)=>{

// 		request("https://www.googleapis.com/oauth2/v4/token", 
// 			{form: {
// 			    grant_type: 'refresh_token',
// 			    client_id: '...',
// 			    client_secret: '...',
// 			    refresh_token: '...'
// 			  },
// 			  json: true
// 			}, function (err, res, body) {
// 		  // assert.equal(typeof body, 'object')
// 		})

	

// });