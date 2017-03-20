// const request = require('request');
// const passport = require('passport');
const google = require('googleapis');


function getAllDriveData(req, res, user) {

  	var service = google.drive('v3');
  	service.files.list({
    	// auth: user.accessToken,
    	pageSize: 10,
    	fields: "nextPageToken, files(id, name)"
  	}, function(err, response) {
    	if (err) {
      		res.json(err);
      		return;
    	}
    	var files = response.files;
    	if (files.length == 0) {
      		res.json([{}]);
    	} else {
      		res.json(files);
        }
  	});
}
	


exports.getAllDriveData = getAllDriveData;