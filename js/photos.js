
$( document ).ready(function() {
// says when html is loaded, do the folowing:

  $("#title").click(function() {
    var $request = $(this)
    $.ajax ({
      url: "http://localhost:4000/foursquare",
      type: "GET",
      success: function (data) {
        var randUrl = data[Math.floor(Math.random() * data.length)]
        var element = $("<img />")
        element.attr("src", randUrl)
          $("#pics").append(element);


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
