//Get User Location
var lat;
var lon;
$( document ).ready(function() {
  var geoSuccess = function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat);
    // $("#loadingPic").click(function() {
    //   $(this).remove()
    //  });
    getPhoto()
  }





navigator.geolocation.getCurrentPosition(geoSuccess);

$("#picDecision i").click(function() {
  var $request = $(this)
  console.log($request.context.id)
  $.ajax({
    type: "POST",
    // url: "http://54.213.91.66/reaction",
    url: "http://localhost:4000/reaction",
    data: {
      reaction: $request.context.id,
      pic_id: $("img").data("id"),
      lat: lat,
      lon: lon
    },
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    success: results()

    });

  });

});


var getPhoto = function() {
  $.ajax({
    type: "GET",
    // url: "http://54.213.91.66/picture",
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
      var obj = data
      var element = $("<img />");
      element.attr("src", obj.url);
      // data() is key, value pair that lets you set distinct values for a single element and retrieve them later
      // id = key
      // value = obj.id
      element.data("id",obj.id)
      $("#pics").html(element);


      var options = {
        preventDefault: true
      };
      var hammertime = new Hammer(element, options);
      hammertime.on('swipeleft swiperight swipedown', function(ev) {
        console.log(ev);
      });


      element.click(function() {
        picInfo(obj, element)

      });
    },

  });
}

var picInfo = function(obj, element) {
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/info",
      data: {
        lat: lat,
        lon: lon,
        photo_id: obj.id
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: "json",
      success: function(data) {
        var picInfo = data
        var infoElement = $("<p> picInfo <p/>");
        element.hide();
        $("#results").html(picInfo);
        $("#results").click(function() {
          // $("#results").hide();
          element.show();
          $("#results").empty();

        });

      }

    });

}


var results = function() {
  console.log("in results")
  $.ajax({
  type: "GET",
  // url: "http://54.213.91.66/done",
  url: "http://localhost:4000/results",
  data: {
    lat: lat,
    lon: lon
  },
  xhrFields: {
    withCredentials: true
  },
  dataType: "json",
  success: function(data) {
    console.log("in success")
    var obj = data
    if(obj.length === 0) {
      console.log(" in if")
      getPhoto()
      console.log("??")
    }
    else {
      console.log("in else")
      $.each(obj, function(key, value) {
        var restaurant = value
        console.log(restaurant);
        $("#picDecision i").remove();
        $("#results").append("<p>" + restaurant + "</p>");
        var element = $("<img/>");
        element.attr("src", "");
        $("#pics").html(element);

      });

    }

     }

  });
}
