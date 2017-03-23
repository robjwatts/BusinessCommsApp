console.log("hi there ya big eediot");
var videoClient;
var activeRoom;
var previewMedia;
var identity;
var roomName;

// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', leaveRoomIfJoined);

$.getJSON('/token', function (data) {
  identity = data.identity;

  // Create a Video Client and connect to Twilio
  videoClient = new Twilio.Video.Client(data.token);
  document.getElementById('room-controls').style.display = 'block';

  // Bind button to join room
  document.getElementById('button-join').onclick = function () {
    roomName = document.getElementById('room-name').value;
    if (roomName) {
      log("Joining room '" + roomName + "'...");

      videoClient.connect({ to: roomName}).then(roomJoined,
        function(error) {
          log('Could not connect to Twilio: ' + error.message);
        });
    } else {
      alert('Please enter a room name.');
    }
  };

  // Bind button to leave room
  document.getElementById('button-leave').onclick = function () {
    log('Leaving room...');
    activeRoom.disconnect();
  };
});

// Successfully connected!
function roomJoined(room) {
  activeRoom = room;

  log("Joined as '" + identity + "'");
  document.getElementById('button-join').style.display = 'none';
  document.getElementById('button-leave').style.display = 'inline';

  // Draw local video, if not already previewing
  if (!previewMedia) {
    room.localParticipant.media.attach('#local-media');
  }

  room.participants.forEach(function(participant) {
    log("Already in Room: '" + participant.identity + "'");
    participant.media.attach('#remote-media');
  });

  // When a participant joins, draw their video on screen
  room.on('participantConnected', function (participant) {
    log("Joining: '" + participant.identity + "'");
    participant.media.attach('#remote-media');
  });

  // When a participant disconnects, note in log
  room.on('participantDisconnected', function (participant) {
    log("Participant '" + participant.identity + "' left the room");
    participant.media.detach();
  });

  // When we are disconnected, stop capturing local video
  // Also remove media for all remote participants
  room.on('disconnected', function () {
    log('Left');
    room.localParticipant.media.detach();
    room.participants.forEach(function(participant) {
      participant.media.detach();
    });
    activeRoom = null;
    document.getElementById('button-join').style.display = 'inline';
    document.getElementById('button-leave').style.display = 'none';
  });
}

//  Local video preview
document.getElementById('button-preview').onclick = function () {
  if (!previewMedia) {
    previewMedia = new Twilio.Video.LocalMedia();
    Twilio.Video.getUserMedia().then(
    function (mediaStream) {
      previewMedia.addStream(mediaStream);
      previewMedia.attach('#local-media');
    },
    function (error) {
      console.error('Unable to access local media', error);
      log('Unable to access Camera and Microphone');
    });
  }
};

// Activity log
function log(message) {
  var logDiv = document.getElementById('log');
  logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
  logDiv.scrollTop = logDiv.scrollHeight;
}

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}


// <!DOCTYPE html>
// <html>
// <head>
//   <title>Twilio Video - Video Quickstart</title>
//   <link rel="stylesheet" href="site.css">
// </head>
// <body>
//   <div id="remote-media"></div>
//   <div id="controls">
//     <div id="preview">
//       <p class="instructions">Hello Beautiful</p>
//       <div id="local-media"></div>
//       <button id="button-preview">Preview My Camera</button>
//     </div>
//     <div id="room-controls">
//       <p class="instructions">Room Name:</p>
//       <input id="room-name" type="text" placeholder="Enter a room name" />
//       <button id="button-join">Join Room</button>
//       <button id="button-leave">Leave Room</button>
//     </div>
//     <div id="log"></div>
//   </div>

//   <script src="//media.twiliocdn.com/sdk/js/common/v0.1/twilio-common.min.js"></script>
//   <script src="//media.twiliocdn.com/sdk/js/video/releases/1.0.0-beta5/twilio-video.js"></script>
//   <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
//   <script src="quickstart.js"></script>
// </body>
// </html>
