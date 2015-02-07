//why u mad?!?!
$( document ).ready(function() {
  var geoSuccess = function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    console.log(position);
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
      }
    });
  };

  navigator.geolocation.getCurrentPosition(geoSuccess);

});
