function search() {
    console.info("function search chamado");

    var query = $("#main_input").val();
    if (query == undefined || query == '') {
        query = $("#nav_input").val();
    }

    console.info("chamando spotify web api");

    $.ajax({
        type : "GET",
        url : "https://api.spotify.com/v1/search",
        data : { q: query, type: "track" },
        async : true,
        contentType : "application/json",
        success : result => {
            console.log(result);

            var content = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n";
            var tracks = result.tracks.items;
            for (var i = 0; i < tracks.length; i++) {
                content += "<tr>\n";
                content += "<td>" + tracks[i].name + "</td>\n";
                content += "</tr>\n";
            }
            content += "</table>\n";

            $("div.card-panel > span.white-text").html(content);
        }
    })
}