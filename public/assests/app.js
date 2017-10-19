$(document).on("click", "#scraper", function(){
  $.ajax({
    url: "/scrape"
  }).done(function(){
    window.location.replace("/");
  })
})

$(document).on("click", "#delete", function(){
    // console.log("you clicked the delete button");
    
    var thisId = $(this).attr("data-id");
    
    $.ajax({
        method: "POST",
        url: "api/articles/delete/" + thisId
        //creating a data object to hold the deleted buttons div, which is selected with their id
        // data: {
        //   title: $("#titleDiv").val(),
        // }
      })
        
        .done(function(data) {

            location.reload();
            console.log("you clicked the delete button");
        });
});

$(document).on("click", "#save", function(){
  // console.log("you clicked the delete button");
  
  var thisId = $(this).attr("data-id");
  console.log("id: ", thisId);
  var saveValue =$(this).data("savevalue");
  console.log(saveValue);
  
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
        
          location.reload();
          console.log("you clicked the save button");
      });
});
