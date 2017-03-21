const request = require('request');
const google = require('googleapis');
const keys = require("../config/keys.js");


function listAllDriveFiles(req, res, user) {

    var url = 'https://www.googleapis.com/drive/v3/files';
    var properties = {
      key: process.env.GOOGLE_API_KEY,
      access_token: user.accessToken
    }

    request({url: url, qs: properties}, function (e, r, files){
    
    if(e) {
      res.json(JSON.parse(e));
    } else {
      res.json(JSON.parse(files));
    }
  });
}

function listTeamDrive(req, res, user) {

}
	
exports.listAllDriveFiles = listAllDriveFiles;