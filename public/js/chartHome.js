$(document).ready(function () {

    function chartHome() {

        let socket = io();

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
                    minPercentage: 0.5,
                    data: score_user
                }
            ]

        };

        let barGraph = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


        let dataUse;

        $.ajax({
            async: false,
            type: "POST",
            url: "http://localhost:3000/dataHome",
            data: "",
            dataType: "json",
            success: function (response) {
                dataUse = response;
            },

            error: function (response, statut, erreur) {
                console.log(erreur);
            }
        });

        console.log(dataUse);

        let ctx2 = $('#chart2');
        let chess = dataUse[1].rate_use_games;
        let sudoku = dataUse[0].rate_use_games;
        let dames = dataUse[2].rate_use_games;
        let connect4 = dataUse[3].rate_use_games;

        var chartPieData = {
            labels: [
                'Sudoku',
                'Échecs',
                'Dames',
                'Puissance 4'
            ],

            datasets: [
                {
                    backgroundColor: [
                        'rgba(240, 230, 140, 0.2)',
                        'rgba(128, 0, 128, 0.2)',
                        'rgba(154, 205, 50, 0.2)',
                        'rgba(178, 34, 34, 0.2)'
                    ],

                    borderColor: [
                        'rgba(240, 230, 140, 1)',
                        'rgba(128, 0, 128, 1)',
                        'rgba(154, 205, 50, 1)',
                        'rgba(178, 34, 34, 1)'
                    ],

                    hoverBackgroundColor: [
                        'rgba(240, 230, 140, 1)',
                        'rgba(128, 0, 128, 1)',
                        'rgba(154, 205, 50, 1)',
                        'rgba(178, 34, 34, 1)'
                    ],
                    borderWidth: 1,
                    data: [sudoku, chess, dames, connect4]
                }
            ]

        };

        let pieChart = new Chart(ctx2, {
            type: 'pie',
            data: chartPieData
        });

    }

    chartHome();
});