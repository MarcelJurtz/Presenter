const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready',function(){
  var mainWin = new BrowserWindow({
    width: 800,
    height: 600
  });
  // Remove Menu-Bar
  mainWin.setMenu(null);

  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;


  function handleRequest(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<input type="button" onClick="hello" value="Click me!"/>');
  }

  function hello() {
    Console.log("Hello WOrld!");
  }

  var server = http.createServer(handleRequest);

  server.listen(port);
});
