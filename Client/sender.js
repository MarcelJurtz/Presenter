function sendRequest() {
  $.ajax({
    type: 'POST',
    // TODO: Fix / use data to add more functionality than forward-clicking
    data: {
         blob: {action:"forward"}
     },
    contentType: "application/json",
    dataType: 'json',
    //url: 'http://localhost:3000/do-work',
    url: 'http://192.168.2.110:3000/act',
    success: function(data) {
      console.log('success');
      console.log(JSON.stringify(data));
    },
    error: function(error) {
      console.log("some error in fetching the notifications");
    }
  });
}
