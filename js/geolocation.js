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
      success: getPhoto

    });

  });
});

var getPhoto = function() {
  $.ajax({
    type: "GET",
    url: "http://localhost:4000/picture",
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
