console.log("test test");
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

$.getJSON('/token', function(data) {
    identity = data.identity;

    // Create a Video Client and connect to Twilio
    videoClient = new Twilio.Video.Client(data.token);
    //in the tutorial, this was getElementById "room-controls"
    // $('#chatArea').style.display = 'block';

    // Bind button to join room
    //in the tutorial, this was getElementById "room-controls"
    // roomName = document.getElementByClassName('button is-success').value;

    /////////////in the tutorial, this was getElementById "room-name"
    roomName = $('.chatName').val;
    console.log(roomName)
    if (roomName) {
        console.log("Joining room '" + roomName + "'...");
        ///////

        videoClient.connect({
            to: roomName
        }).then(roomJoined,
            function(error) {
                console.log('Could not connect to Twilio: ' + error.message);
            });
    } else {
        alert('Please enter a room name.');
    }
});

// Bind button to leave room
//need a LEAVE ROOM button..//
///
///
/////////////////////////////////////
// document.getElementById('button-leave').onclick = function() {
    $( ".leaveChat" ).click(function() {
    console.log('Leaving room...');
    activeRoom.disconnect();
    });


// Successfully connected!
function roomJoined(room) {
    activeRoom = room;

    console.log("Joined as '" + identity + "'");
    document.getElementByClassName('submitChat').style.display = 'none';

    //need leave button
    document.getElementById('button-leave').style.display = 'inline';

    // Draw local video, if not already previewing
    //need local media line..
    if (!previewMedia) {
        room.localParticipant.media.attach('#local-media');
    }


    //need remote media line
    room.participants.forEach(function(participant) {
        console.log("Already in Room: '" + participant.identity + "'");
        participant.media.attach('#remote-media');
    });


    //////////////////
    // When a participant joins, draw their video on screen
    room.on('participantConnected', function(participant) {
        console.log("Joining: '" + participant.identity + "'");
        participant.media.attach('#remote-media');
    });

    // When a participant disconnects, note in log
    room.on('participantDisconnected', function(participant) {
        console.log("Participant '" + participant.identity + "' left the room");
        participant.media.detach();
    });
    ///////////////////////////////////////////////////
    // When we are disconnected, stop capturing local video
    // Also remove media for all remote participants
    room.on('disconnected', function() {
        console.log('Left');
        room.localParticipant.media.detach();
        room.participants.forEach(function(participant) {
            participant.media.detach();
        });
        activeRoom = null;
        document.getElementByClassName('button is-success').style.display = 'inline';

        ///need leave button
        // document.getElementById('button-leave').style.display = 'none';
        document.getElementByClassName('leaveChat').style.display = 'none';
    });
}

//  Local video preview

//need preview button
$("#previewVid").click(function() {
    console.log("vide start")
    if (!previewMedia) {
        previewMedia = new Twilio.Video.LocalMedia();
        Twilio.Video.getUserMedia().then(
            function(mediaStream) {
                previewMedia.addStream(mediaStream);
                previewMedia.attach('#local-media');
            },
            function(error) {
                console.error('Unable to access local media', error);
                console.log('Unable to access Camera and Microphone');
            });
    }
});

// // Activity log .. no need for this i don't think so im commenting it out. 
// function log(message) {
//   var logDiv = document.getElementById('log');
//   logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
//   logDiv.scrollTop = logDiv.scrollHeight;
// }

function leaveRoomIfJoined() {
    if (activeRoom) {
        activeRoom.disconnect();
    }
}