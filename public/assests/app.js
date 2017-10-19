$(document).on("click", "#delete", function(){
    // console.log("you clicked the delete button");
    
    var thisId = $(this).attr("data-id");
    
    $.ajax({
        method: "POST",
        url: "/delete/" + thisId
        // data: {
        //   id: 
        //   title: $("#titleinput").val(),
          
        //   body: $("#bodyinput").val()
        // }
      })
        
        .done(function(data) {
            
        //   console.log(data);
          console.log("you clicked the delete button");
        //   $("#notes").empty();
        });
    
      
    //   $("#titleinput").val("");
    //   $("#bodyinput").val("");
    
});