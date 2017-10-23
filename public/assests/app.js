// $.getJSON("/", function(data){
  
// })

$(document).on("submit", "#scraper", function(e){
  e.preventDefault();
  $.ajax({
    url: "/scrape",
    method: "GET"
  }).done(function(){
    location.reload();  
  })
})

$(document).on("click", "#delete", function(e){
  e.preventDefault(); 
  var thisId = $(this).attr("data-id");
    
    $.ajax({
        url: "/api/articles/delete/" + thisId,
        method: "POST"
      })   
        .then(function(data) {
            location.reload();
        });
});

$(document).on("click", "#save", function(e){
  e.preventDefault();
  
  var thisId = $(this).attr("data-id");
  console.log("data-id: ", thisId);
  var saveValue =$(this).data("savevalue");
  console.log("save value: ", saveValue);
  
  var newSavedState = {
    saved: saveValue
  }

  $.ajax({
      method: "PUT",
      url: "/api/articles/save/" + thisId,
      body: newSavedState
    })
      .then(function(data) {
          location.reload();//this will reload the page so the article will populate the saved page section
      });
});
$(document).on("click", "#note", function(e){
  e.preventDefault(); 
  $("#notes").empty();
  
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
     
      $("#notes").append("<div class ='jumbotron'>"+"<h2> Note for: "  + data.title + "</h2>"+"</div>");  
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button class= 'btn btn-dark'data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });

});

$(document).on("click", "#savenote", function() {
 
  var thisId = $(this).attr("data-id");

  
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

