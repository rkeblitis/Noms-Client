
$( document ).ready(function() {
// says when html is loaded, do the folowing:

  $("#picDecision"). click(function() {
    var $request = $(this)
    $.ajax ({
      url: "http://localhost:4000/foursquare",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data)
        // var obj = jQuery.parseJSON( data )
        var element = $("<img />")
        element.attr("src", data.url);
        $("#pics").html(element);
      },

      error: function () {
        console.log("ErrrROAR");
      }
    });
  })

});
