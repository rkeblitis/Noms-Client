
$( document ).ready(function() {
// says when html is loaded, do the folowing:

  $("#test").click(function() {
    console.log("hi")
    var $request = $(this)
    $.ajax ({
      url: "http://localhost:4000/foursquare"

    });
  })

});
