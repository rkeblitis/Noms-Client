
$( document ).ready(function() {
// says when html is loaded, do the folowing:

  $("#test").click(function() {
    console.log("hi")
    var $request = $(this)
    $.ajax ({
      url: "http://localhost:4000/foursquare",
      type: "GET",
      success: function (data) {
        console.log(data)
        $.each(data, function(index, src) {
          var element = $("<img />")
          element.attr("src", src)
          $("#pics").append(element);
        })

      }

    });
  })

});
