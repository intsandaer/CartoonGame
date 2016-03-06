var LUCKY_NUMBER = 1; //a random number
var CARTOON_NUM = 20; //number of cartoons
var chance = 0; // number of changes user can play to win

//Define credit class
function Credit(credit) {
    this.credit = credit;

    this.updateUI = function () {
        //update credit in UI
        var oldCredit = parseInt(document.getElementById("lblCredit").innerText);
        document.getElementById("lblCredit").innerText = this.credit;
    };

    this.addCredit = function (value) {
        this.credit = this.credit + parseInt(value);
        this.updateUI();
    };

    this.subtractCredit = function (value) {
        this.credit = this.credit - parseInt(value);
        this.updateUI();
    };
}

//Define Bid class
function Bid(id, bid) {
    this.id = id;
    this.bid = bid;

    this.setBid = function (value) {
        this.bid = value;
        this.updateUI();
    };

    this.resetBid = function () {
        this.bid = 0;
        this.updateUI();
    };

    this.updateUI = function () {
        //update credit in UI
        document.getElementById("lblBid" + id).innerText = this.bid;
    };

    this.resetBackground = function () {
        document.getElementById("bid" + id).style.backgroundColor = "#FFF";
    };

}

//define objects
var creditObject = new Credit(100);

var bidObject1 = new Bid(1, 0);
var bidObject2 = new Bid(2, 0);
var bidObject3 = new Bid(3, 0);
var bidObject4 = new Bid(4, 0);
var bidObject5 = new Bid(5, 0);

function loadCredit() {
    var credit = prompt("Please enter your credits", "0");

    if (credit == null) {
        credit = 0;
    }
    if (isNaN(credit)) {
        alert("Please enter valid credits");
        return;
    } else if (parseInt(credit) > 100) { // allow users can not each time 100 credits
        alert("You only can load max 100 credits");
        return;
    }
    //add credit
    creditObject.addCredit(credit);

}

function resetBid() {
    bidObject1.resetBid();
    bidObject2.resetBid();
    bidObject3.resetBid();
    bidObject4.resetBid();
    bidObject5.resetBid();

    bidObject1.resetBackground();
    bidObject2.resetBackground();
    bidObject3.resetBackground();
    bidObject4.resetBackground();
    bidObject5.resetBackground();

}

function enterBid(id) {
    var bid = prompt("Please enter your bid", "0");
    if (bid == null) {
        bid = 0;
    }
    if (isNaN(bid)) {
        alert("Please enter valid credits");
        return;
    }

    var credit = creditObject.credit;

    if (parseInt(bid) > parseInt(credit)) {
        alert("Not enough credits");
        return;
    } else {
        creditObject.subtractCredit(parseInt(bid));
    }

    if (id == 1) {
        bidObject1.setBid(bid);
    } else if (id == 2) {
        bidObject2.setBid(bid);
    } else if (id == 3) {
        bidObject3.setBid(bid);
    } else if (id == 4) {
        bidObject4.setBid(bid);
    } else if (id == 5) {
        bidObject5.setBid(bid);
    }
}

function resetCartoonsBackground() {
    for (var i = 1; i <= CARTOON_NUM; i++) {
        document.getElementById("item" + i).style.backgroundColor = "#FFF";
    }
}

function spin() {
    //get random number from 1 to 5
    LUCKY_NUMBER = Math.floor((Math.random() * 5) + 1);

    //change background of random cartoon
    document.getElementById("bid" + LUCKY_NUMBER).style.backgroundColor = "black";

    document.getElementById("play").style.display = "";

    document.getElementById("spin").style.display = "none";
}


var matchedCartoon = false;
var addedCredit = 0;
var run = 0;

function resetRunStep() {
    run = 0;
    matchedCartoon= false;
    addedCredit = 0;

    //remove all cartoons items background
    resetCartoonsBackground();
}


function play() {

    if (LUCKY_NUMBER == 0) {
        alert("Please Click Spin to get a lucky number!");
        return;
    }

    run++;

    //play audio when running
    playSound('audio');

    //get random number from 1-20
    var rand = null;

    //if rand number is invisible cartoons or already display, then need to get another random number
    while (rand === null || rand === 7 || rand === 8 || rand === 9 || rand === 12 || rand === 13 || rand === 14
    || document.getElementById("item" + rand).style.backgroundColor == "black") {
        rand = Math.floor((Math.random() * 20) + 1);
    }

    document.getElementById("item" + rand).style.backgroundColor = "black";

    if (rand == 1 || rand == 5 || rand == 15) {
        var rate1 = parseInt(document.getElementById("rate1").innerText);

        if (LUCKY_NUMBER == 1) {
            matchedCartoon = true;
            addedCredit += rate1 * 2;
        }
    }
    if (rand == 2 || rand == 6 || rand == 18) {
        var rate2 = parseInt(document.getElementById("rate2").innerText);

        if (LUCKY_NUMBER == 2) {
            matchedCartoon = true;
            addedCredit += rate2 * 2;
        }
    }

    if (rand == 3 || rand == 10 || rand == 17) {
        var rate3 = parseInt(document.getElementById("rate3").innerText);

        if (LUCKY_NUMBER == 3) {
            matchedCartoon = true;
            addedCredit += rate3 * 2;
        }
    }
    if (rand == 4 || rand == 11 || rand == 19) {
        var rate4 = parseInt(document.getElementById("rate4").innerText);

        if (LUCKY_NUMBER == 4) {
            matchedCartoon = true;
            addedCredit += rate4 * 2;
        }
    }

    if (rand == 16 || rand == 20) {
        var rate5 = parseInt(document.getElementById("rate5").innerText);

        if (LUCKY_NUMBER == 5) {
            matchedCartoon = true;
            addedCredit += rate5 * 2;
        }
        addedCredit += rate5 * 2;
    }

    var credit = creditObject.credit;
    var timer = setTimeout("play()", 1200);

    if (run == 3) {
        //clear timer
        clearTimeout(timer);

        if (matchedCartoon) {
            creditObject.addCredit(addedCredit);
            alert("You win " + addedCredit / 2);

            chance = 0;

            finish();

        } else {
            chance = chance + 1;

            if (chance >= 2) {
                alert("You lose!");
                creditObject.subtractCredit(credit);

                finish();

            } else {
                alert("You have " + (2 - chance) + " turn left");
            }
        }
    }

}


function finish(){
    //hide/show buttons
    document.getElementById("play").style.display = "none";
    document.getElementById("spin").style.display = "";

    //reset bid
    resetBid();

    //remove all cartoons items background
    resetCartoonsBackground();

    //stop play audio
    stopSound('audio');
}