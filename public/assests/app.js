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
  
});
