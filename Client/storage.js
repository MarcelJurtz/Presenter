function GetDeviceName() {
  if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("deviceName") == "undefined" || localStorage.getItem("deviceName") == "") {
      return "NoName";
    }
    return localStorage.getItem("deviceName");
} else {
    return "Storage not supported!";
  }
}

function SetDeviceName() {
  console.log("Save dev called")
  if(typeof(Storage) !== "undefined") {
    var name = document.getElementById("txtDevName").value;
    localStorage.setItem("deviceName",name);
    // Toast notification
    $('.info').fadeIn(400).delay(3000).fadeOut(400);
  }
}

$('document').ready(function(){
  document.getElementById("txtDevName").value = GetDeviceName();
});
