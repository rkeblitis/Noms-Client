// says when html is loaded, do the folowing:
$( document ).ready(function() {

  $("#mehButton").submit(function() {
    console.log($(this).id)

    var $request = $(this)
    $.ajax ({
      url: "http://localhost:4000/foursquare",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data );
        // var obj = jQuery.parseJSON( data )
        console.log($(this).id);

        var element = $("<img />");
        element.attr("src", data.url);
        $("#pics").html(element);

      },
      error: function () {
        console.log("ErrrROAR");
      }

    });

    function blah () {
      console.log("blah");
    }
  })

});
