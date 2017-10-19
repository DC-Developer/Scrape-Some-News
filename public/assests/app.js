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
