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
  getPhoto(3)

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


var getPhoto = function(number) {
  $.ajax({
    type: "GET",
    // url: "http://54.213.91.66/picture",
    url: "http://localhost:4000/picture",
    data: {
      lat: lat,
      lon: lon,
      number: number
    },
    // tell to send cookies
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    success: function(data) {
      // remove element with loading gif
      $("#loading").remove()
      $(".container-fluid").show()
      var obj = data
      console.log(obj)
      $.each(obj, function(key, value) {
        var element = $("<img />");
        element.attr("src", value.url);
        // data() is key, value pair that lets you set distinct values for a single element and retrieve them later
        // id = key
        // value = obj.id
        element.data("id",value.id)
        $("#pics").append(element);

        element.click(function() {
          $("#info").show()
          picInfo(value, element)

        });

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
        // hides pics div:
        element.hide();
        var results = data.name + " \n" + data.category + " \n" + data.address + " \n" + data.phone_number
        $("#info").html(results);
        $("#info").click(function() {
          // $("#results").hide();
          element.show();
          $("#info").hide()
          $("#info").empty();
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
      // if an empty array is returned in the response:
      if(obj.length === 0) {
        $("#pics img:first-child").remove()
        console.log(" in if")
        getPhoto(1)
        console.log("??")
      }
      else {
        console.log("in else")
        $.each(obj, function(key, value) {
          $("#picDecision i").hide();
          $("#pics").hide();
          var result_info = value.name + " \n" + value.category + " \n" + value.address + " \n" + value.phone_number + " \n"
          console.log(result_info);
          $("#results").empty()
          // $("resutls").append("No need to panic, you're results are in...")
          $("#results").html(result_info);
          $("#results").show()


          // var restart = $("<button> Restart! </button>")
          // restart.attr("class","btn btn-default")
          // $("#restartSession").html(restart)

        });

      }

    }

  });
}
