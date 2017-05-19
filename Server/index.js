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
  app.use(cors());

  // instead of two app.post functions, use this one
  app.get('/remote/:key', function(request, response, next) {
    var ip = getRemoteIP(request);
    updateCString(mainWin, ip + " - presenter - " + request.params.key);
    robot.keyTap(request.params.key);
    response.send(request.params.key + ' key pressed');
  });

  app.post('/act', function(request, response, next) {
    updateCString(mainWin, "received GET /act request");
  });

  app.get('/youtube', function(request, response, next) {});

  app.listen(port, function() {
    updateCString(mainWin, 'CORS-enabled web server listening on port ' + port);
  });
});


// Update loggin-text
// displayed in electron mainWin
function updateCString(mainWin, text) {
  contentString += getFormattedDate() + " " + text;
  contentString += "<br />";
  mainWin.loadURL("data:text/html;charset=utf-8," + encodeURI(contentString));
  //console.log(text);
}

// Get timestamp for logging
function getFormattedDate() {
  var d = new Date();
  d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
  return d;
}

// Get remote IP for logging
// requires 'Request'-object from handleRequest()
function getRemoteIP(request) {
  var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
  // IPv4 is mapped to IPv6, this reverts this
  ip = ip.replace(/^.*:/, '');
  return ip;
}
