$(document).ready(function () {

    function chartProfil() {



        let dataRes;

        $.ajax({
            async: false,
            type: "POST",
            url: "http://localhost:3000/Profil",
            data: "",
            dataType: "json",
            success: function (response) {
                dataRes = response;
            },

            error: function (response, statut, erreur) {
                console.log(erreur);
            }
        });

        let chartProfil = $('#chartProfil');
        let name_user = dataRes[0].name_user;
        let mail_user = dataRes[0].mail_user;
        let about_user = dataRes[0].about_user;
        let score_user = dataRes[0].about_user;
        let score_chess_user = dataRes[0].score_chess_user;
        let score_connect4_user = dataRes[0].score_connect4_user;
        let score_dames_user = dataRes[0].score_dames_user;
        let score_sudoku_user = dataRes[0].score_sudoku_user;


        $('#aboutMeSection').attr('placeholder', about_user);
        $('#aboutMeSection2').text(about_user);


        let chartDataRes = {
            labels: [
                'Échecs',
                'Puissance 4',
                'Dames',
                'Sudoku'
            ],

            datasets: [
                {
                    label: 'Scores',
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

                    data: [score_chess_user, score_connect4_user, score_dames_user, score_sudoku_user]
                }
            ]
        }

        let doughnutChart = new Chart(chartProfil, {
            type: 'doughnut',
            data: chartDataRes
        })

    }

    chartProfil();
});