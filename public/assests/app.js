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
    // console.log("you clicked the delete button");
    
    var thisId = $(this).attr("data-id");
    
    $.ajax({
        url: "/api/articles/delete/" + thisId,
        method: "POST"
        //creating a data object to hold the deleted buttons div, which is selected with their id
        // data: {
        //   title: $("#titleDiv").val(),
        // }
      })
        
        .then(function(data) {
            location.reload();
            console.log("you clicked the delete button");
        });
});

$(document).on("click", "#save", function(e){
  e.preventDefault();
  // console.log("you clicked the delete button");
  
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
      //creating a data object to hold the deleted buttons div, which is selected with their id
      // data: {
      //   title: $("#titleDiv").val(),
      // }
    })
      
      .then(function(data) {
          // console.log("you clicked the save button");
          location.reload();
      });
});
