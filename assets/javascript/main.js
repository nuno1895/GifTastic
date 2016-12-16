// alert("testing if refs properly");
//***************Global Variable**************
var topicsArray = ['superman' , 'the flash', 'green lantern', 'wonder woman' , 'deadshot' , 'batman' , 'supergirl', 'Robin', 'green arrow' ];






//***************Functions********************


  function displayGifs() {

    var hero =$(this).attr('data-name');

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({
      url: queryURL,
      method:"GET"
    }).done(function(response){
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='column-2'>");

          var rating = results[i].rating;
          console.log(results[i].rating);

          var stillImage = results[i].images.fixed_width_still.url;
          var animatedImage = results[i].images.fixed_width.url;


          var p = $("<p>").text("Rating: " + rating);

          var heroImage = $("<img>");
          heroImage.attr("src", stillImage).attr("data-still" , stillImage).attr("data-animate" , animatedImage).attr("data-state" , "still").attr("class" ,  "gif");

          gifDiv.prepend(p);
          gifDiv.prepend(heroImage);

          $("#gifs-appear-here").prepend(gifDiv);
       };   
      });
  };

  function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $('#initalBtns').empty();

        // Loops through the array of movies
        for (var i = 0; i < topicsArray.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var btn = $('<button>');
          // Adds a class of movie to our button
          btn.addClass('hero');
          // Added a data-attribute
          btn.attr('data-name', topicsArray[i]);
          // Provided the initial button text
          btn.text(topicsArray[i]);
          // Added the button to the buttons-view div
          $('#initalBtns').append(btn);
        };
      };

      $('#find-hero').on('click', function (event){

        event.preventDefault();

        var heroInput =$('#hero-input').val().trim();

        topicsArray.push(heroInput);

        renderButtons();
      });
	
 $(document).on("click", ".hero", displayGifs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      
      $(document).on("click", ".gif", function(){
      // $(".gif").on("click", function () {
          var state = $(this).attr("data-state");

      console.log(state);

      if (state == 'still') {
        var animate =$(this).attr("data-animate")
        $(this).attr("data-state" , "animate" ).attr("src" , animate);
      }else {
        var still =$(this).attr("data-still")
        $(this).attr("data-state" , "still" ).attr("src" , still) ;
      };
      })

