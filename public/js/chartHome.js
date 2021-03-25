$(document).ready(function () {

    function chartHome() {


        let dataScore;

        $.ajax({
            async: false,
            type: "POST",
            url: "http://localhost:3000/",
            data: "",
            dataType: "json",
            success: function (response) {
                dataScore = response;
            },

            error: function (response, statut, erreur) {
                console.log(erreur);
            }
        });

        let ctx = $('#chart');
        let name_user = [];
        let score_user = [];


        for (var i in dataScore) {
            name_user.push(dataScore[i].name_user);
            score_user.push(dataScore[i].score_user);
        }

        var chartData = {
            labels: name_user,
            datasets: [
                {
                    label: 'Score des joueurs',
                    backgroundColor: 'rgba(137, 201, 227, 0.2)',
                    hoverBackgroundColor: 'rgba(137, 201, 227, 1)',
                    borderColor: 'rgba(137, 201, 227, 1)',
                    borderWidth: 1,
                    data: score_user
                }
            ]

        };

        let barGraph = new Chart(ctx, {
            type: 'bar',
            data: chartData
        });




    }

    chartHome();
});