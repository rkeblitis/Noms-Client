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
        var result = data.name + "<br />"  + data.category + "<br />"  + data.address + "<br />"  + data.phone_number
        $("#info").html(result);
        $("#info").click(function() {
          // $("#results").hide();
          $("#info").empty();
          element.show();
          $("#info").hide()

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
        console.log("in else");
        var message_element = $("<h2 />");
        var mes = message_element.append("Hangry no more...")
        var result_div = $("<h3 />")
        $("#results").empty();
        $("#picDecision i").hide();
        $("#hangry").hide()
        $("#pics").hide();
        $("#results").prepend(mes)
        $.each(obj, function(key, value) {
          var result_info = value.name + "<br />" + value.category + "<br />"  + value.address + "<br />"  + value.phone_number + "<br />" + "<br />"  + "<hr />"
          console.log(result_info);
          result_div.append(result_info);
          $("#results").append(result_div)
          $("#results").show()


          // var restart = $("<button> Restart! </button>")
          // restart.attr("class","btn btn-default")
          // $("#restartSession").html(restart)

        });

      }

    }

  });
}
