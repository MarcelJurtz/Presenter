function sendRequest() {
  urlx = 'http://192.168.2.110:3000/remote';
  console.log(urlx);
  $.ajax({
    type: 'POST',
    // TODO: Fix / use data to add more functionality than forward-clicking
    data: {
         blob: {action:"forward"}
     },
    contentType: "application/json",
    dataType: 'json',
    //url: 'http://localhost:3000/do-work',
    url: urlx,
    success: function(data) {
      console.log('success');
      console.log(JSON.stringify(data));
      console.log(url);
    },
    error: function(error) {
      console.log("some error in fetching the notifications");
      console.log(url);
    }
  });
}