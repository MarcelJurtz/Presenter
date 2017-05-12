const electron = require('electron');
const {
  app,
  BrowserWindow
} = electron;
var robot = require("robotjs");

//var app = require('app');  // Module to control application life.
//var BrowserWin = require('browser-window');  // Module to create native browser window.
var mainWin = null;
var ks = require('node-key-sender');


var fs = require('fs');
var contentString;

app.on('ready', function() {
  mainWin = new BrowserWindow({
    width: 800,
    height: 600
  });

  contentString = "";

  // Remove Menu-Bar
  mainWin.setMenu(null);

  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;

  updateCString(mainWin, "Server gestartet...");

  function handleRequest(request, response) {

    // GET -> Lade Website
    if (request.method == 'GET' && request.url == '/') {
      updateCString(mainWin, getRemoteIP(request) + " - GET-Anfrage");

      response.writeHead(200, {
        "Content-Type": "text\plain"
      });
      fs.createReadStream('./index.html').pipe(response);
    } else if (request.method === 'POST' && request.url == '/do-work') {
      updateCString(mainWin, getRemoteIP(request) + " - POST-Anfrage");
      // asuming sync as in your exampl
      let resultX = handleInteraction(request.body);
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.write(JSON.stringify({
        result: resultX
      }));
      response.end();
    } else {
      updateCString(mainWin, getRemoteIP(request) + " - Fehlerhafte Anfrage (404)");
      console.log(request.method);
      response.writeHead(404, {
        "Content-Type": "application/json"
      });
      response.end();
    }
  }

  var server = http.createServer(handleRequest);
  server.listen(port);
});

function updateCString(mainWin, text) {
  contentString += getFormattedDate() + " " + text;
  contentString += "<br />";
  mainWin.loadURL("data:text/html;charset=utf-8," + encodeURI(contentString));
}

function handleInteraction(content) {
  robot.keyTap("right");
  return "Forward";
}

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

function getRemoteIP(request) {
  var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
  return ip;
}
