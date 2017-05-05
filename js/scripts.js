/** Pega a entrada do usuario e redireciona para a página de listagem das músicas */
function redirectToTracks() {
    console.log("getting user input and redirecting to tracks page");

    var query = $("#main_input").val();
    if (query == undefined || query == '') {
        query = $("#nav_input").val();
    }

    window.location.href = "./html/tracks.html?query=" + query;
}

/** Realiza a busca, método chamado ao terminar o load da página */
function search() {
    console.info("calling spotify web api");

    var href = window.location.href;
    var query = href.substring(href.indexOf("=") + 1);

    $.ajax({
        type : "GET",
        url : "https://api.spotify.com/v1/search",
        data : { q: query, type: "track", limit: 10 },
        async : true,
        cache : false,
        contentType : "application/json",
        success : result => {
            var tracks = result.tracks.items;
            console.log(tracks);

            var content = "<table class=\"bordered responsive-table\">\n";
            for (var i = 0; i < tracks.length; i++) {
                content += "<tr>\n";
                content += "<td>" + tracks[i].name + "</td>\n";
                content += "<td>\n";
                content += "<audio controls>\n";
                content += "<source src=\"" + tracks[i].preview_url + "\" type=\"audio/mpeg\">\n";
                content += "Your browser does not support the audio element.\n";
                content += "</audio>\n";
                content += "</td>\n";
                content += "</tr>\n";
            }
            content += "</table>\n";

            console.log(content);

            $("div.card-panel > span.white-text").html(content);
        }
    })
}
