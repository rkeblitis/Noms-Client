
$( document ).ready(function() {
// says when html is loaded, do the folowing:

  $("#title").click(function() {
    var $request = $(this)
    $.ajax ({
      url: "http://localhost:4000/foursquare",
      type: "GET",
      dataType: "text",
      success: function (data) {
        // This specifies the index; Math.floor means to round down
        // var randIndex = Math.floor(Math.random() * data.length)
        // var randUrl = data[randIndex]
        var element = $("<img />")
        element.attr("src", data)
          $("#pics").html(element);
            // splice.data(randIndex, 1)
      },

      error: function () {
        console.log("ERROR");
      }
    });
  })

});





// I have my pic displayed
//  I need to only display 1 random one at a time

//
// $.each(data, function(index, picUrl) {
//   var element = $("<img />")
//   element.attr("src", picUrl)
//   $("#pics").append(element);
// })
