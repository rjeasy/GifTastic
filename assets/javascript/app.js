var topics = ["Black Panther", "Guardians of the Galaxy", "Iron Man", "Ragnarok", "Captain America: Civil War", "The Avengers", "Spider-Man", "Captain Marvel", "Doctor Strange", "Thor"];

function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn marvel-button");
        // newButton.addClass("marvel-button");
        newButton.text(topics[i]);
        $("#button-container").append(newButton);
        console.log(newButton);
        console.log(topics)
    }
    //remove privous event
    $(".marvel-botton").unbind("click");

    $(".marvel-button").on("click", function () {
        $(".gif-image").unbind("click");
        $("gif-container").empty();
        populateGIFContainer($(this).text());
    })

}

function addButton(show) {
    if (topics.indexOf(show) === -1) {
        topics.push(show);
        $("#button-container").empty();
        renderButtons();
        // console.log(topics)
    }
}

function populateGIFContainer(show) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=knXl2aXdd2Cl1ugO6vNKcB4fVgASm07M",
        method: "GET"

    }).then(function (response) {
        console.log(response)
        response.data.forEach(function (element) {
            newDiv = $("<div>");
            newDiv.addClass("individual-gif-container");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("data-state", "still");
            newImage.attr("data-still", element.images.fixed_height_still.url);
            newImage.attr("data-animated", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gif-container").prepend(newDiv);
        });

        $("#gif-container").addClass("dotted-border");
        // $(".gif-image").unbind("click");
        $(document).on("click", ".gif-image", function () {
            if ($(this).attr("data-state") === "still") {
                $(this).attr("data-state", "animated");
                $(this).attr("src", $(this).attr("data-animated"));

            }
            else {
                $(this).attr("data-state", "still");
                $(this).attr("src", $(this).attr("data-still"));
            }

        });
    });
}

$(document).ready(function () {
    renderButtons();
    $("#submit").on("click", function () {
        event.preventDefault();
        addButton($("#marvel-show").val().trim());
        $("#marvel-show").val("");
    });
});