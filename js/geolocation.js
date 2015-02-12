//Get User Location
var lat;
var lon;
$( document ).ready(function() {
  var geoSuccess = function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat);
    getPhoto()
  }
  navigator.geolocation.getCurrentPosition(geoSuccess);

  $("#picDecision button").click(function() {
    var $request = $(this)
    console.log($request.context.name)
    $.ajax({
      type: "POST",
      url: "http://localhost:4000/reaction",
      // http://54.213.91.66/
      data: {
        reaction: $request.context.name,
        pic_id: $("img").data("id"),
        lat: lat,
        lon: lon
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: "json",
      success: done
      // getPhoto
      //  call next_step: call to aip ask if done, if yes return answer if not call getPhoto

    });

  });
});

var getPhoto = function() {
  $.ajax({
    type: "GET",
    url: "http://localhost:4000/picture",
    // http://54.213.91.66/
    data: {
      lat: lat,
      lon: lon
    },
    // tell to send cookies
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    success: function(data) {
      console.log(data);
      var obj = data
      var element = $("<img />");
      element.attr("src", obj.url);
      element.data("id",obj.id)
      $("#pics").html(element);

    }

  });
}


var done = function() {
  $.ajax({
  type: "GET",
  url: "http://localhost:4000/done",
  data: {
    lat: lat,
    lon: lon
  },
  xhrFields: {
    withCredentials: true
  },
  dataType: "json",
  success: function(data) {
    console.log(data);
    var obj = data
    var element = $("<img />");
    element.attr("src", obj.url);
    element.data("id",obj.id)
    $("#pics").html(element);
   }

  });
}
