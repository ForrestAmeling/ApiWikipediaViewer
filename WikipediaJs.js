$(document).ready(function() {
  //id search searches wiki api and user's searchText
  $('#search').click(function() {
    //users search terms
    var searchTerm = $('#searchText').val();
    //apends searchText into wiki api
    var wikiLink = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json&callback=?';

    $.ajax({

      type: "GET",
      url: wikiLink,

      //designates the content to be in JSON format, encoded in the UTF-8 character encoding
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",

      //alert the The request URL and DATA parameters inside the Success function
      success: function(data, textStatus, jqXHR) {

        $('#output').html("");

        //for loop iterates BACKWARDS through the array.
        for (var i = data[1].length; --i >= 0;) {

          //index 3 is wiki article title
          //index 1 is the url to the article
          //index 2 is the article description 
          $('#output').prepend("<div><div class='btn-default'><a target='blank' href=" + data[3][i] + "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");

          //clears searchText input 
          $("#searchText").val('');
        }
      },
      error: function(errorMessage) {
        alert("ERROR");
      }

    });

  });

  //$("#searchText").keypress(function(e){
  //if(e.which==13){
  //$("#search").click();
  //}
  //});

  //deletes user input when user clicks x icon
  $('.fa-window-close').on('click', function() {
    $('#searchText').val("");
  })

});