const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready',function(){
  var mainWin = new BrowserWindow({
    width: 800,
    height: 600
  });
  // Remove Menu-Bar
  mainWin.setMenu(null);
});
