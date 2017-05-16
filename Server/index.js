const electron = require('electron');
const robot = require("robotjs");
const fs = require('fs');
//const http = require('http');
const express = require('express');
const cors = require('cors');

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

  const port = 3000;

  var app = express();
  app.use(cors())

  app.post('/remote', function (request, response, next) {

    response.json({msg: 'This is CORS-enabled for all origins!'});
    var ip = getRemoteIP(request);

    // GET -> Lade Website
    if (request.method === 'POST') {
      updateCString(mainWin, ip + " - POST request received");
      robot.keyTap("right");

      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      /*
      response.write(JSON.stringify({
        result: resultX
      }));
      */
      response.end();
    } else {
      updateCString(mainWin, ip + " - Error requesting " + request.url + "using " + request.method);
      response.writeHead(404, {
        "Content-Type": "application/json"
      });
      response.end();
    }
  });

  app.post('/act', function (request, response, next) {
    updateCString(mainWin, "received GET /act request");
  });

  app.get('/youtube', function (request, response, next) {});

  app.listen(port, function () {
    updateCString(mainWin, 'CORS-enabled web server listening on port ' + port);
  });
});


// Update loggin-text
// displayed in electron mainWin
function updateCString(mainWin, text) {
  contentString += getFormattedDate() + " " + text;
  contentString += "<br />";
  //mainWin.loadURL("data:text/html;charset=utf-8," + encodeURI(contentString));
  console.log(text);
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
