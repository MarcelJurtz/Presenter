const electron = require('electron');
const robot = require("robotjs");
const fs = require('fs');
const http = require('http');

const {
  app,
  BrowserWindow
} = electron;

var mainWin = null;
var contentString;

app.on('ready', function() {
  mainWin = new BrowserWindow({
    width: 800,
    height: 600
  });

  contentString = "";

  // Remove Menu-Bar
  mainWin.setMenu(null);

  const hostname = '127.0.0.1';
  const port = 3000;

  function handleRequest(request, response) {

    var ip = getRemoteIP(request);

    // GET -> Lade Website
    if (request.method == 'GET' && request.url == '/') {
      updateCString(mainWin, ip + " - GET request received");

      response.writeHead(200, {
        "Content-Type": "text\plain"
      });
      fs.createReadStream('./index.html').pipe(response);
    } else if (request.method === 'POST' && request.url == '/act') {
      updateCString(mainWin, ip + " - POST request received");
      let resultX = handleInteraction(request.body);
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.write(JSON.stringify({
        result: resultX
      }));
      response.end();
    } else {
      updateCString(mainWin, ip + " - Unavailable site requested: " + request.url);
      response.writeHead(404, {
        "Content-Type": "application/json"
      });
      response.end();
    }
  }

  var server = http.createServer(handleRequest);
  server.listen(port);
  updateCString(mainWin, "Server started:" + server.address().address + ":" + port);
});

// Update loggin-text
// displayed in electron mainWin
function updateCString(mainWin, text) {
  contentString += getFormattedDate() + " " + text;
  contentString += "<br />";
  mainWin.loadURL("data:text/html;charset=utf-8," + encodeURI(contentString));
}

// Handle interaction to achieve 'right-arrow-click' functionality
function handleInteraction(content) {
  robot.keyTap("right");
  return "Forward";
}

// Get timestamp for logging
function getFormattedDate() {
  var currentdate = new Date();
  var timestamp = "";
  if (currentdate.getHours < 10) timestamp += "0" + currentdate.getHours() + ":";
  else timestamp += currentdate.getHours() + ":";
  if (currentdate.getMinutes < 10) timestamp += "0" + currentdate.getMinutes() + ":";
  else timestamp += currentdate.getMinutes() + ":";
  if (currentdate.getSeconds < 10) timestamp += "0" + currentdate.getSeconds() + ":";
  else timestamp += currentdate.getSeconds();

  return timestamp;
}

// Get remote IP for logging
// requires 'Request'-object from handleRequest()
function getRemoteIP(request) {
  var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
  return ip;
}
