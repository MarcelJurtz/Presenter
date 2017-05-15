function startPresenter() {
  navigate("presenter.html")
}

function startYTRemote() {

}

function startRemoteMouse() {

}

function startSettings() {

}

function navigate(url) {
  /*
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  return xmlhttp.responseText;*/
  window.open(url, "_self");
}
