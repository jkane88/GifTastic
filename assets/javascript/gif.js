$(document).ready(function () {

    let topics = ["Music", "Video Games", "Hip-Hop", "Guitar"];

    // giphy api key: ZgTO2LDyWrp5QkI98sMcaV7xAOgL4hCs
    // giphy link + api key: https://api.giphy.com/v1/gifs/?api_key=ZgTO2LDyWrp5QkI98sMcaV7xAOgL4hCs

    // function re-renders the HTML to display the appropriate content

    let newGif = $(this).attr("data-name");
    let giphy = {
        apiKey: 'ZgTO2LDyWrp5QkI98sMcaV7xAOgL4hCs',
        queryResults: '',

        search: function (userInput) {
            userInput = userInput.trim().toLowerCase();
            userInput = userInput.replace(' ', '+');
            let queryUrl = `https://api.giphy.com/v1/gifs/search?q=${userInput}&api_key=${giphy.apiKey}&limit=10`;
            console.log(userInput);

            // Creating an AJAX call for the specific gif button being clicked
            $.ajax({
                url: queryUrl,
                method: "GET"

            }).then(function (response) {
                giphy.queryResults = response.data;

                console.log(giphy.queryResults);
                renderGifs();
            });

        }
    }

    // Function for displaying gif & data
    function renderButtons() {

        //  adding new gifs

        $("#buttons-div").empty();
        console.log('this')
        // Looping through the array of ropics(gifs)
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each gif in the topic array

            let a = $("<button>");
            // Adding a class of gif-btn to button
            a.addClass("gif-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a gif button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        let topic = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of "topics" array
        renderButton(topic);
        giphy.search(topic);


    });
    $(document).on("click", ".gif-btn", function (event) {
        event.preventDefault();
        giphy.search($(this).attr('data-name'))
    })
    function renderButton(topic) {

        let a = $("<button>");
        // Adding a class of gif-btn to button
        a.addClass("gif-btn");
        // Adding a data-attribute
        a.attr("data-name", topic);
        // Providing the initial button text
        a.text(topic);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
    function renderGif(gif) {
        let imgURL = gif.images.fixed_height_still.url;

        // Creating an element to hold the image
        let image = $("<img>").attr("src", imgURL).addClass('gifClass');
        image.attr('data-state', 'still');
        image.attr('data-still', gif.images.fixed_height_still.url);
        image.attr('data-animate', gif.images.fixed_height.url);
        // Creating a div to hold the gif
        let gifDiv = $("<div class='gifDiv'>");

        // Storing the rating data
        let rating = gif.rating;
        let title = gif.title;
        let type = gif.type;

        // Creating an element to have the rating displayed
        let pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        gifDiv.append(pOne);
        
        // Appending the image
        gifDiv.append(image);

        // Putting the entire gif result above the previous topics
        $("#gif-view").prepend(gifDiv);


    }
    function renderGifs() {
        $.each(giphy.queryResults, function (index, gif) {
            renderGif(gif);
        })

    }
    $(document).on("click", '.gifClass', function () {
        
        let state = $(this).attr("data-state");
        
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
       
        

    });
    renderButtons();
});
// get gifs to start/stop use gifDiv 'state' variable 