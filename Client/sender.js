// General sinle-key sending
function sendKey(key) {
  return $.get('http://192.168.2.110:3000/remote/' + key)
}

//##########################################################
//                    PRESENTATION REMOTE                  #
//##########################################################

// Forward
function sendForwardRequest() {
  sendKey('right').done(function(response) { console.log("Forward request successfully finished"); }).fail(function(error) { console.log("Error forward!"); });
}

// Backwards
function sendBackwardsRequest() {
  sendKey('left').done(function(response) { console.log("Forward request successfully finished"); }).fail(function(error) { console.log("Error backwards"); });
}


//##########################################################
//                      YOUTUBE REMOTE                     #
//##########################################################

function sendFastForwardRequest() {
  sendKey('l').done(function(response) { console.log("Fast-forward request successfully finished"); }).fail(function(error) { console.log("Error fast-forward!"); });
}

// Backwards
function sendRewindRequest() {
  sendKey('j').done(function(response) { console.log("Rewind request successfully finished"); }).fail(function(error) { console.log("Error rewind"); });
}

function sendPlayPauseRequest() {
  var successful = false;
  sendKey('k').done(function(response) {
    console.log("Play-pause request successfully finished");
    $("#cmdPlayPause").toggleClass("fa-play");
    $("#cmdPlayPause").toggleClass("fa-pause");
    // TODO: Determine the starting point (play or pause)
  }).fail(function(error) {
    console.log("Error play-pause");
  });
}
