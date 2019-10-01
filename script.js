$("form").submit(function (event) {
    event.preventDefault() // No refresh
    $("#loader").show() // Bring back the loader!
    var search = $("#search").val() // Reads search value
    $('#songs').html("")  // Remove old songs
    // AJAX IS GETTING DATA FROM ITUNES
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + search,
        dataType: 'JSONP'
    })
        .done(function (data) {
            $("#loader").hide()
            console.log(data);
            // add code for when response from apple comes back.

            if (data.results.length === 0) {
                $('#songs').html(`
                <h3>${search}: has no results</h3>
                <img class='sadPenguin' src='https://i.makeagif.com/media/9-20-2015/u-iz62.gif'>
                `)
            }

            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].trackName) {
                    // MAKE THIS SONG LIST BETTER
                    $('#songs').append(`
                    <li>
                        <div class="collapsible-header"><i class="material-icons">music_note</i>${data.results[i].trackName}</div>
                        <div class="collapsible-body">
                            <div class="bodyContent">
                                <div>
                                    <img src="${data.results[i].artworkUrl60}">
                                </div>
                                <ul>
                                    <li>Price: $${data.results[i].trackPrice}</li>
                                    <li>Artist Name: ${data.results[i].artistName}</li>
                                    <li>
                                        <audio controls>
                                            <source src="${data.results[i].previewUrl}" type="audio/mpeg">
                                            Your browser does not support the audio element.
                                        </audio>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>`);
                }
            }
            $('.collapsible').collapsible();
        })
        .fail(function (data) {
            console.log(data);
            $('#songs').append(data.status);
        })
});// End of on ready part