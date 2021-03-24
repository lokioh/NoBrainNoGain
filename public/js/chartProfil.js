$(document).ready(function () {

    function chartProfil() {

        var dataScore;
    
        $.ajax({
            async: false,
            type: "POST",
            url: "http://localhost:3000/",
            data: "/Profil",
            dataType: "json",
            success: function (response) {
                dataScore = response;
            }, 
            
            error: function(response, statut, erreur) {
                console.log(erreur);
            }
        });

        
    }

    chartProfil();
});