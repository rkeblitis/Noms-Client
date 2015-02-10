//Get User Location
$( document ).ready(function() {
  var geoSuccess = function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat);
    //  Send lat and long to noms api //
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
        element.attr("src", data.url);
        $("#pics").html(element);


        // Send lat, lon, and pic info if mehButton is clicked /////////////////
        $("#mehButton").click(function() {
          var $request = $(this)
          console.log($request.context.name)
          console.log(obj)
          $.ajax({
            type: "POST",
            url: "http://localhost:4000/reaction",
            data: {
              reaction: $request.context.name,
              pic_obj: obj,
              lat: lat,
              lon: lon
            },
            dataTyle: "json",
            success: function(data) {
              console.log(data)

              $.ajax({
                type: "GET",
                url: "http://localhost:4000/picture",
                data: {
                  lat: lat,
                  lon: lon
                },
                datatyle: "json",
                success: function(data) {
                  console.log(data)
                  element.attr("src", data.url);
                  $("#pics").html(element);

              }

            });
          },

            error: function() {
              console.log("ErrrROAR");
            }

          });

        });
        // Send lat, lon, and pic info if flagButton is clicked ////////////////
        $("#flagButton").click(function() {
          var $request = $(this)
          console.log($request.context.name)
          console.log(obj)
          $.ajax({
            type: "POST",
            url: "http://localhost:4000/reaction",
            data: {
              reaction: $request.context.name,
              pic_obj: obj,
              lat: lat,
              lon: lon
            },
            dataTyle: "json",
            success: function(data) {
              console.log(data)
              element.attr("src", data.url);
              $("#pics").html(element);

            },

            error: function() {
              console.log("ErrrROAR");
            }

          });

        });

        // Send lat, lon, and pic info if hangryButton is clicked //////////////
        $("#hangryButton").click(function() {
          var $request = $(this)
          console.log($request.context.name)
          console.log(obj)
          $.ajax({
            type: "POST",
            url: "http://localhost:4000/reaction",
            data: {
              reaction: $request.context.name,
              pic_obj: obj,
              lat: lat,
              lon: lon
            },
            dataTyle: "json",
            success: function(data) {
              console.log(data)
              element.attr("src", data.url);
              $("#pics").html(element);

            },

            error: function() {
              console.log("ErrrROAR");
            }

          });

        });

      },

      error: function() {
        console.log("ErrrROAR");
      }


    });



  };

  navigator.geolocation.getCurrentPosition(geoSuccess);

});
