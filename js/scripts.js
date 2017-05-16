var audioMap = new Map();
var lastButton = null;

function redirectToSearch() {
    window.location.href = "./html/search.html";
}

function redirectToBackground() {
    window.location.href = "./professional_background.html";
}

/** Pega a entrada do usuario e redireciona para a página de listagem das músicas */
function redirectToTracks() {
    console.log("getting user input and redirecting to tracks page");

    var query = $("#main_input").val();
    if (query == undefined || query == '') {
        alert("Digite algo para pesquisar!");
        return;
    }

    
    var regExp = new RegExp(/[!@#$%^&*()_+=-`~;'":/?.,<>]/g);
    if (regExp.test(query)) {
        alert("Não são permitidos caracteres especiais!!!");
        return;
    }

    query = query.replace(/ /g, "+");
    window.location.href = "./tracks.html?query=" + query;
}

function playSound(index) {
    var audio = null;
    if (index == lastButton) {
        audio = audioMap.get(index);
        audio.pause();

        $("#i"+index).html("play_arrow");
        $("#btn"+index).removeClass("pulse");
        
        lastButton = null;
    } else {
        if(lastButton != null) {
            audio = audioMap.get(lastButton);
            audio.pause();

            $("#i"+lastButton).html("play_arrow");
            $("#btn"+lastButton).removeClass("pulse");
        }

        audio = audioMap.get(index);
        audio.play();
        
        $("#i"+index).html("pause");
        $("#btn"+index).addClass("pulse");

        lastButton = index;

        var promise = new Promise((resolve, reject) => {
            setTimeout(function(){
                $("#i"+index).html("play_arrow");
                $("#btn"+index).removeClass("pulse");

                resolve("Success!");
            }, 30000);
        });
    }
}

/** Realiza a busca, método chamado ao terminar o load da página */
function search() {
    console.info("calling spotify web api");

    var href = window.location.href;
    var query = href.substring(href.indexOf("=") + 1);

    $.ajax({
        type : "GET",
        url : "https://api.spotify.com/v1/search",
        data : { q: query, type: "track", limit: 24 },
        async : true,
        cache : false,
        contentType : "application/json",
        success : result => {
            var tracks = result.tracks.items;
            console.log(tracks);
            
            var content = "<table class=\"tracks-table\">\n";
            if (tracks.length > 0) {
                for (var i = 0; i < tracks.length; i++) {
                    if ((i > 0 || i < 24) && i % 3 == 0) {
                        content += "</tr>\n";
                        content += "<tr>\n";
                    }
                    content += "<td>\n";
                    content += "    <div class=\"track-image\">\n";
                    content += "        <img src=\""+tracks[i].album.images[1].url+"\">\n";
                    content += "    </div>\n";
                    content += "    <div class=\"track-info\">\n";
                    content += "        <a id=\"btn"+i+"\" class=\"floating-btn spotify-bg\" href=\"javascript:playSound("+i+")\"><i id=\"i"+ i +"\" class=\"material-icons\">play_arrow</i></a>\n";
                    content += "        <p><strong>"+tracks[i].artists[0].name + " - " +  tracks[i].name+"</strong></p>\n";
                    content += "    </div>\n";
                    content += "</td>\n";

                    // add to array
                    audioMap.set(i, new Audio(tracks[i].preview_url));
                }
            } else {
                alert("Não há resultados para a busca realizada!");
                window.location.href = "../index.html";
            }
            content += "</table>\n";

            $("div.panel > span").html(content);
        }
    });
}
