$(document).ready(function() {

    var questions = new Array();
    questions.push(new Object(question1 = { question: "Who wrote and produced Stranger Things?", rightAnswer: "Duffer Brothers", explain: "Stranger Things is an American science fiction-horror web television series created, written, directed and co-executive produced by the Duffer Brothers, as well as co-executive produced by Shawn Levy and Dan Cohen.", answerchoices: ["Dan Cohen", "Duffer Brothers", "Jay Z", "Ellen"] })),
        questions.push(new Object(question2 = { question: "In what town/city does the show take place in?", rightAnswer: "Hawkins, Indiana", explain: "Set in the fictional town of Hawkins, Indiana, in the 1980s, the first season focuses on the investigation into the disappearance of a young boy amid supernatural events.", answerchoices: ["Hawkins, Indiana", "Crown Point, Indiana", "Cedar Lake, Indiana", "Paris, France"] })),
        questions.push(new Object(question3 = { question: "What is the portal to the alternate dimension in the show called?", rightAnswer: "The Upside Down", explain: "The nearby Hawkins National Laboratory ostensibly performs scientific research for the United States Department of Energy, but secretly does experiments into the paranormal and supernatural, including those that involve human test subjects. Inadvertently, they have created a portal to an alternate dimension called the Upside Down", answerchoices: ["The Fog", "The Darkness", "The Upside Down", "The Underworld"] })),
        questions.push(new Object(question4 = { question: "What type of power does Eleven possess?", rightAnswer: "Psychokinesis", explain: "The first season begins in November 1983, when Will Byers is abducted by a creature from the Upside Down. His mother, Joyce, and the town's police chief, Jim Hopper, search for Will. At the same time, a young psychokinetic girl called Eleven escapes from the laboratory and assists Will's friends.", answerchoices: ["Telekinesis", "Invisibility", "Flight", "Psychokinesis"] })),
        questions.push(new Object(question5 = { question: "What actress plays the mother of Will and Jonathan Byers", rightAnswer: "Winona Ryder", explain: "Winona Ryder as Joyce Byers, the mother of Will and Jonathan Byers. She is divorced from Lonnie Byers.", answerchoices: ["Winona Ryder", "Natalia Dyer", "Cara Buono", "Sadie Sink"] })),
        questions.push(new Object(question6 = { question: "What item does Joyce Byers use to communicate with Will?", rightAnswer: "Christmas Lights", explain: "Joyce strings Christmas lights around her home to talk to Will, who can turn them on and off.", answerchoices: ["Oujia Board", "Walkie Talkie", "Christmas Lights", "Rosary"] })),
        questions.push(new Object(question7 = { question: "What is Eleven's favorite food?", rightAnswer: "Eggo Waffles", explain: "Watch the damn show and you'll want them too.", answerchoices: ["Eggo Waffles, Skittles, Bologna, La Croix"] })),
        questions.push(new Object(question8 = { question: "What is Dustin's 'discovered' creature named?", rightAnswer: "Dart", explain: "Dustin feeds the creature a 3 Musketeers chocolate bar and names it d'Artagnan ('Dart').", answerchoices: ["Bones", "Dart", "Slimey", "Charcoal"] })),
        questions.push(new Object(question9 = { question: "What are the monsters in the show called?", rightAnswer: "Demogorgon", explain: "In the Dungeons & Dragons fantasy role-playing game, Demogorgon is a powerful demon prince.", answerchoices: ["Pokemon", "Dragon", "Demogorgon", "Manticore"] })),
        questions.push(new Object(question10 = { question: "What dance does Mike ask Eleven to?", rightAnswer: "Snow Ball", explain: "Mike asks Eleven to a school dance, the Snow Ball, and kisses her. The military storms the school to re-capture Eleven, but she kills them and collapses.", answerchoices: ["Turnabout", "Prom", "Homecoming", "Snow Ball"] })),

        console.log(questions);

    var theQuestion = [];
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var answerSelected = false;
    var i = 0;
    var button = '<button class="start-button">Start Over</button>';

    var timeLeft = [];
    var timer = {
        time: 15,
        reset: function() {
            timer.time = 15;
        },

        start: function() {
            counter = setInterval(timer.count, 1000);
        },

        stop: function() {
            clearInterval(counter);
        },

        count: function() {
            timer.time--;
            var converted = timer.timeConverter(timer.time);
            console.log(converted);
            timeLeft.push(converted);
            $('#timer').html("Time left: " + converted + " seconds");
        },

        timeConverter: function(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return seconds;
        }
    }



    function clearDivs() {
        $('#timer').empty();
        $('#info-area').empty();
        $('#ans-or-gif').empty();
    }

    function rightNoti() {
        $('#timer').html("<p>Correct!</p>")
        correct++;
    }

    function wrongNoti() {
        $('#timer').html("<p>Wrong!</p>");
        incorrect++;
    }

    function showAnswers() {
        $('#info-area').html('<p> The correct answer is <b>' + theQuestion.rightAnswer + '</b>. ' + theQuestion.explain + '</p>');
        $('#ans-or-gif').html('<img src="' + theQuestion.photoLink + '" alt="' + theQuestion.rightAnswer + '">');
        i++;
    }

    function stopCounting() {
        timer.stop();
        timer.reset();
    }



    //GAME START HERE-----------------------------------------------------------

    function playGameGlobal() {

        $('.start-button').on('click', function() {

            function playGame() {

                clearDivs();
                clearTimeout();

                answerSelected = false;

                if (i === questions.length) {
                    clearDivs();
                    $('#info-area').html('<p> Great job completing this quiz! Here\'s how you did.</p>');
                    $('#ans-or-gif').html('<div> Correct: ' + correct + '</div><div> Incorrect: ' + incorrect + '</div><div> Unanswered: ' + unanswered + '</div><div>' + button + '</div>');
                    $('.start-button').on('click', function() {
                        i = 0;
                        playGame();
                    })
                }

                if (i < questions.length) {
                    theQuestion = questions[i];
                    console.log(theQuestion);

                    //start the timer
                    timer.start();

                    //posting the question details on the screen
                    $('#info-area').html("<p>" + theQuestion.question + "</p>");

                    for (var b = 0; b < theQuestion.answerchoices.length; b++) {
                        var a = $('<div>');
                        a.removeClass();
                        a.addClass('answers answers-button');
                        a.attr('data-let', theQuestion.answerchoices[b]);
                        a.text(theQuestion.answerchoices[b]);

                        $('#ans-or-gif').append(a);
                    }

                    //if there is no response in 15 seconds, the game times out
                    function unansweredNoti() {
                        clearDivs();
                        $('#timer').html("<p>Pick</p>");
                        unanswered++; // number of unaswered goes up
                        showAnswers();
                        stopCounting();
                        setTimeout(playGame, 5000);
                    }
                    setTimeout(unansweredNoti, 15000);

                    // if and when the player chooses an answer from the list
                    $('.answers').on('click', function() {
                        var chosen = $(this).data('let');
                        console.log(chosen);

                        answerSelected = true;
                        clearTimeout(unansweredNoti);

                        if (chosen === theQuestion.rightAnswer) {
                            console.log("You are right!");
                            clearDivs();
                            rightNoti();
                            showAnswers();
                            stopCounting();
                            setTimeout(playGame, 5000);
                        } else if (chosen !== theQuestion.rightAnswer) {
                            console.log("Nope, wrong!");
                            clearDivs();
                            wrongNoti();
                            showAnswers();
                            stopCounting();
                            setTimeout(playGame, 5000);

                        }
                    })


                }

            }

            playGame();


        })

    }

    playGameGlobal();

})