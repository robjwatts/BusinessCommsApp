const request = require('request');
const google = require('googleapis');
const keys = require("../config/keys.js");


function listAllDriveFiles(req, res, user) {

    var url = 'https://www.googleapis.com/drive/v3/files';
    var properties = {
      key: process.env.GOOGLE_API_KEY,
      access_token: user.accessToken
    }

    //calling the api using request npm package
    request({url: url, qs: properties}, function (e, r, files){
    
    if(e) {
      res.json(JSON.parse(e));
    } else {
      res.json(JSON.parse(files));
    }
  });
}

function createTeamDrive(accessToken) {
  console.log(accessToken);
  return new Promise((resolve, reject)=>{

    var parameters = {
      "kind": "drive#teamDrive",
      "id": "TopLevel",
      "name": "Main",
      "capabilities": {
        "canAddChildren": true,
        "canComment": true,
        "canCopy": true,
        "canDeleteTeamDrive": false,
        "canDownload": true,
        "canEdit": false,
        "canListChildren": true,
        "canManageMembers": false,
        "canReadRevisions": false,
        "canRemoveChildren": false,
        "canRename": false,
        "canRenameTeamDrive": false,
        "canShare": true
      }
    }

    var url = 'https://www.googleapis.com/drive/v3/teamdrives';
    var properties = {
      key: process.env.GOOGLE_API_KEY,
      requestId: "TopLevel"
    }
 
    var options = {
        method: 'post',
        url: url,
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        qs: properties,
        json: parameters
    }

    //call request --should this be a promise based function???

    request(options, function (err, res, body) {
      console.log(`request`);
      console.log(body);
      if (err) { 
        reject(err);
      } else { 
        resolve(body);
      }

    });

  });

}

function listTeamDriveFiles(accessToken) {

  (function getTeamDrives(accessToken) {

    return new Promise((resolve, reject)=>{

      var url = 'https://www.googleapis.com/drive/v3/teamdrives';
      var properties = {
        key: process.env.GOOGLE_API_KEY,
        access_token: accessToken
      }

      //calling the api using request npm package
      request({url: url, qs: properties}, function (err, r, drive){
      
        if(err) {
          reject(err);
        } else {
          resolve(JSON.parse(drive));
          
        }
      });

    });
    
  })(accessToken).then((drive)=>{

    getTeamDriveFileList(drive, accessToken).then((files)=>{


      var filesData = [];

      getSingleFileMetaData(files.files[10].id, accessToken).then((data)=>{
        console.log(data);
      }).catch((err)=> {if (err) console.log(err)});

      // files.files.forEach((file)=>{

      //   getSingleFileMetaData(file.id, accessToken).then((data)=>{
      //     filesData.push(data);
      //     console.log(data);
      //   }).catch((err)=> {if (err) console.log(err)});

      // });

      


    }).catch((err)=> {if (err) console.log(err)});
    
  }).catch((err)=> {if (err) console.log(err)});

  function getTeamDriveFileList(drive, accessToken) {

    return new Promise((resolve, reject)=>{

      var url = 'https://www.googleapis.com/drive/v3/files';
      var properties = {
        key: process.env.GOOGLE_API_KEY,
        access_token: accessToken,
        corpora: "teamDrive",
        includeTeamDriveItems: true,
        supportsTeamDrives: true,
        teamDriveId: drive.teamDrives[0].id,

      }

      //calling the api using request npm package
      request({url: url, qs: properties}, function (err, r, files){
        if(err) {
          reject(err);
        } else {
          resolve(JSON.parse(files));
        }
      });
    });
  }

  function getSingleFileMetaData(file, accessToken) {

    return new Promise((resolve, reject)=>{

      var url = 'https://www.googleapis.com/drive/v3/files/' + file;
      var properties = {
        key: process.env.GOOGLE_API_KEY,
        access_token: accessToken,
        supportsTeamDrives: true
      }

      request({url: url, qs: properties}, function (err, r, data){
          if(err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        });
    });
  }

}
	
exports.listAllDriveFiles = listAllDriveFiles;
exports.createTeamDrive = createTeamDrive;
exports.listTeamDriveFiles = listTeamDriveFiles;