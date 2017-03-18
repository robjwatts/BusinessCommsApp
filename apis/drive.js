const request = require('request');
const passport = require('passport');

function getAllDriveData(req, res) {
	
	request.get('https://www.googleapis.com/drive/v3/about/', {fields: {
		access_token: req.user.accessToken
	}}, function (error, response, body) {
		// res.json(response);

		if (error) {
			res.sendStatus(500).res.json(error);
		} else {
			var data = JSON.parse(body);
    		res.json(data);
		}
    });

}

exports.getAllDriveData = getAllDriveData;