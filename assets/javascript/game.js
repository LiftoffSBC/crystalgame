$(document).ready(function () {

    var wins = 0;
    var losses = 0;
    var crystals;

    var yourNum = 0;
    var randomNum = randomNumGen();

    function randomNumCrystals() {

        return {
            red: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/red.jpg"
            },
            blue: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/blue.jpg"
            },
            yellow: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/yellow.jpg"
            },
            green: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/green.jpg"
            }
        };
    }

    function randomNumGen() {
        return Math.floor(Math.random() * 102) + 19;
    }

    function setGame() {
        yourNum = 0;

        crystals = randomNumCrystals();
        randomNum = randomNumGen();
        $("#number-display").text(randomNum);
    }

    function updateDom(didUserWin) {
        $("#win-lose").empty();

        if (didUserWin === true) {
            $("#win-lose").append($("<p>").text("You won!!"));
            setGame();
            renderMatchingNumber();
        }
        else if (didUserWin === false) {
            $("#win-lose").append($("<p>").text("You lost!!"));
            setGame();
            renderMatchingNumber();
        }

        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);

        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");

        pWins.append(wSpan);
        pLosses.append(lSpan);

        $("#win-lose").append(pWins);
        $("#win-lose").append(pLosses);
    }

    function renderCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
            var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
            crystalDiv.append(crystalImg);
            $("#crystal").append(crystalDiv);
        }
    }

    function updateMatchingNumber(crystal) {
        yourNum += crystals[crystal.attr("data-name")].points;
    }

    function renderMatchingNumber() {
        var scoreNumDiv = $("<div id='score-number'>").text(yourNum);
        $("#score").html();
        $("#score").html(scoreNumDiv);
    }

    setGame();
    updateDom();
    renderCrystals();
    renderMatchingNumber();

    $(".crystals-button").on("click", function (event) {
        updateMatchingNumber($(this));
        renderMatchingNumber();

        if (yourNum === randomNum) {
            wins++;
            setGame();
            updateDom(true);
        }
        else if (yourNum > randomNum) {
            losses++;
            setGame();
            updateDom(false);
        }
    });
});
