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
    var query = href.substring(href.indexOf("="));

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