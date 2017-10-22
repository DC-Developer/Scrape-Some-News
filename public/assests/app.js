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
  var thisId = $(this).attr("data-id");
  console.log(thisId);
});
//below will take in the data from the textfield of note in the note modal
$(document).on("click", "#saveNote", function(e){
  e.preventDefault(); 
  var parent = $(this).parents("#titleDiv").data();
  // var thisId = parent._id;
  console.log("parentId: ", parent);
  // console.log("save note id: ",thisId);
  var newTitle = $("#noteTitle").val();
  console.log(newTitle);
  var newBody = $("#noteText").val();
  console.log(newBody);
  var newNote ={
    title: newTitle,
    body: newBody
  }
  // $.ajax({
  //   method: "POST",
  //   url: "/api/articles/save/" + thisId,
  //   body: newSavedState
  // })
  //   .then(function(data) {
  //       location.reload();//this will reload the page so the article will populate the saved page section
  //   });
  
});
