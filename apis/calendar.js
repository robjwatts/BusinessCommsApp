const request = require('request');
const google = require('googleapis');
const keys = require("../config/keys.js");


function listAllEvents(req, res, user) {

    var url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
    var properties = {
      key: process.env.GOOGLE_API_KEY,
      access_token: user.accessToken
    }

    request({url: url, qs: properties}, function (e, r, events){
    
    if(e) {
      res.json(JSON.parse(e));
    } else {
      res.json(JSON.parse(events));
    }
  });
}

function listTeamDrive(req, res, user) {

}
	
exports.listAllEvents = listAllEvents;