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
    done()
  }


  navigator.geolocation.getCurrentPosition(geoSuccess);

  $("#picDecision i").click(function() {
    var $request = $(this)
    console.log($request.context.id)
    $.ajax({
      type: "POST",
      url: "http://localhost:4000/reaction",
      // http://54.213.91.66/
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
      success: done()


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
      var obj = data
      var element = $("<img />");
      console.log(obj)
      element.attr("src", obj.url);
      console.log(obj)
      // data() is key, value pair that lets you set distinct values for a single element and retrieve them later
      // id = key
      // value = obj.id
      element.data("id",obj.id)
      $("#pics").html(element);

    }

  });
}


var done = function() {
  console.log("in done")
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




        // var element = $("<h1 /h1>");
        // element.attr(value);
        // $("#results").html(element);


        // var element = $("<img/>");
        // element.attr("src", "../stylesheets/hangry.jpg");
        // // element.data("id",obj.id)
        // $("#pics").html(element);

      });

    }

     }

  });
}
