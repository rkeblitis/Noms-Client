//Get User Location
$( document ).ready(function() {
  var geoSuccess = function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    console.log(lat);
    $.ajax({
      type: "POST",
      url: "http://localhost:4000/foursquare",
      data: {
          lat: lat,
          lon: lon
      },
      dataType: "json",
      success: function(data) {
        console.log(data);
        var obj = data
        var element = $("<img />");
        element.attr("src", data.url);
        $("#pics").html(element);
      },

      error: function() {
        console.log("ErrrROAR");
      }


    });
  };

  navigator.geolocation.getCurrentPosition(geoSuccess);

});
