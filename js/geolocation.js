//Get User Location
var lat;
var lon;

$( document ).ready(function() {
  navigator.geolocation.getCurrentPosition(geoSuccess);

  $("#pics").on("swipeleft", function() {
    console.log("left");
    nextPhoto("meh")
  });

  $("#pics").on("swiperight", function() {
    console.log("right");
    nextPhoto("nom")
  });

  $(document).on('swipedown', '#pics', function () {
    console.log("down");
    nextPhoto("flag")
  });

  $("#picDecision i").click(function() {
    var $request = $(this)
    console.log($request)
    nextPhoto($request.context.id)
  });
});

var geoSuccess = function(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat);
  // $("#loadingPic").click(function() {
  //   $(this).remove()
  //  });
  getPhoto()
}


var nextPhoto = function(reaction) {
    console.log(reaction);
    $.ajax({
      type: "POST",
      // url: "http://54.213.91.66/reaction",
      url: "http://localhost:4000/reaction",
      data: {
        reaction: reaction,
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

  }


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

      element.click(function() {
        picInfo(obj, element)

      });
    }

  });
}

var picInfo = function(obj, element) {
    $.ajax({
      type: "GET",
      // url: "http://54.213.91.66/info",
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
    // url: "http://54.213.91.66/results",
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
      console.log(data)
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
          $("#pics").hide()
          // $("#results").append("<p>" + restaurant + "</p>");
          $("#results").append(restaurant);
          // var element = $("<img/>");
          // element.attr("src", "");
          // $("#pics").html(element);
          var restart = $("<button> Restart! </button>")
          restart.attr("class","btn btn-default")
          $("#restartSession").html(restart)

        });

      }

    }

  });
}
