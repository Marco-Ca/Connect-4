var curPlayer = "player1",
    slot = $(".slot"),
    isGameOver = false,
    oldWinner = $("#oldWinner"),
    winner  = $("#winner"),
    s1 = 0,
    s2 = 0,
    container = $(".container");

container.on("click", function(e) {
    var slotsInColumn = $(e.currentTarget).find(".slot");
    if (!isGameOver) {
        for (var i = 5; i >= 0; i--) {
            if (!slotsInColumn.eq(i).hasClass("player1")) {
                if (!slotsInColumn.eq(i).hasClass("player2")) {
                    break;
                }
            }
        }
        console.log($(e.currentTarget).find(".slot"));
    }
    if ($(e.currentTarget).find(".slot") == -1) {
        console.log("-1");
        return;
    }

    slotsInColumn.eq(i).addClass(curPlayer);

    $('#uno').css("text-decoration", "underline");
    $('.logosP').css('display', 'none');
    if (lotto() > 7) {
        $('.logosP').css('display', 'block');
    }

    function victor(){
        if (checkForVictory(slotsInColumn) || (checkForVictory($(".row" + i))) || (checkDiag($(".slot")))) {
            winnerMenu();        }
        $('#scoreUno').text(s1);
        $('#scoreDos').text(s2);
    }

    $('.logosP').off().on('click', function(){
        var x = prompt("How many versions of the Iron Man armor has Tony Stark made?");
        if ( x == '47') {
            if (curPlayer == "player1") {
                superPower2(slot);
            } else if (curPlayer == "player2") {
                superPower(slot);
            }
        } else {
            if (curPlayer == "player1") {
                superPower(slot);
            } else if (curPlayer == "player2") {
                superPower2(slot);
            }
        }
        $('.logosP').css('display', 'none');
        victor();
        switchPlayer();
    });
    victor();
    switchPlayer();
});

function switchPlayer() {
    if (curPlayer == "player1") {
        curPlayer = "player2";
        $('#uno').css("text-decoration", "none");
        $('#dos').css("text-decoration", "underline");
    } else {
        curPlayer = "player1";
        $('#uno').css("text-decoration", "underline");
        $('#dos').css("text-decoration", "none");
    }
}

function checkForVictory(slots) {
    var str = "";
    for (var i = 0; i < slots.length; i++) {
        if (slots.eq(i).hasClass(curPlayer)) {
            str += "w";
        } else {
            str += "n";
        }
        if (str.indexOf("wwww") > -1) {
            return true;
        }
    }
}

function superPower(slot) {
    var counter = 0;
    for (var i = 0; i <= slot.length; i++) {
        console.log(counter);
        if (counter < 2 && slot.eq(i).hasClass("player1")) {
            slot.eq(i).removeClass("player1").addClass("player2");
            counter++;
        }
    }
    checkForVictory(slot);
    checkDiag(slot);
}

function superPower2(slot) {
    var counter = 0;
    for (var i = 0; i <= slot.length; i++) {
        console.log(counter);
        if (counter < 2 && slot.eq(i).hasClass("player2")) {
            slot.eq(i).removeClass("player2").addClass("player1");
            counter++;
        }
    }
    checkForVictory(slot);
    checkDiag(slot);
}

function lotto() {
    return Math.floor(Math.random() *10);
}

function winnerMenu() {
    oldWinner.text(curPlayer + " WINS!");
    winner.css("display", "block");
    $('.board.active').css('filter', 'blur(2px)');
    $('.slideshow').css("filter", "blur(2px)");
    isGameOver = true;
    if (curPlayer == 'player1') {
        s1 ++;
    } else if (curPlayer == 'player2') {
        s2 ++;
    }
}

$(".reveal").on("click", function() {
    var s = prompt("Secret Code Needed");
    if (s == "Avengers Initiative") {
        $("#uno").text($("#unoName").val().toUpperCase());
        $("#dos").text($("#dosName").val().toUpperCase());
        $(".board").addClass("active");
        $(".logos").addClass("active");
        $("#unoName").remove();
        $("#dosName").remove();
        $('#scoreUno').text(0);
        $('#scoreDos').text(0);
        s1 = 0;
        s2 = 0;
        reset(slot);
        $("audio")[0].play();
        $(".white").delay(2000).fadeTo(5000, 0.01, function() {
            $(this).slideUp(350, function() {
                $(this).remove();
            });
        });
    }
});

function reset(slot){
    slot.removeClass("player1");
    slot.removeClass("player2");
    $("#oldWinner").text(" ");
    winner.css("display", "none");
    $('.board.active').css('filter', 'blur(0px)');
    $('.slideshow').css("filter", "blur(0px)");
    isGameOver = false;
    curPlayer = "player1";
    $('.logosP').css('display', 'none');
    $('#uno').css("text-decoration", "underline");
    $('#dos').css("text-decoration", "none");
}

$("#yes").on("click", function(){
    reset(slot);
});

$('#no').on("click", function() {
    $('.board.active').addClass('gone');
    winner.css("display", "none");
    setTimeout(function(){
        $('#blur img').css("display", "block");
    }, 11000);

});

function checkDiag(slots) {
    var str1 = "", str2 ='', str3 = '', str4 ='';
    for ( var a = 0, b = 6; a <= 2; a++, b+=6) {
        for (var x = a, y = b; x <= 23; x += 7, y += 7 ) {
            slots.eq(x).hasClass(curPlayer) ? str1 += "w" :  str1 += "n";
            slots.eq(y).hasClass(curPlayer) ? str2 += "w" :  str2 += "n";
            if (str1.indexOf("wwww") > -1 || str2.indexOf("wwww") > -1) {
                return true;
            }
        }
    }
    for (var c = 5, d = 11; c >=3; c--, d+=6 ) {
        for (var e = c, f = d; e <= 30; e+=5, f+=5) {
            slots.eq(e).hasClass(curPlayer) ? str3 += "w" :  str3 += "n";
            slots.eq(f).hasClass(curPlayer) ? str4 += "w" :  str4 += "n";
            if (str3.indexOf("wwww") > -1 || str4.indexOf("wwww") > -1) {
                return true;
            }
        }
    }
}
