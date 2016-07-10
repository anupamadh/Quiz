$(document).ready(function() {
  var questions = [{
    question: "What ingredient makes bread rise?",
    options: ["Gluten", "Soda", "Yeast"],
    indexAnswer: 2
  }, {
    question: "What is the European dish calamari?",
    options: ["Squid", "Kalamansi", "Prawn"],
    indexAnswer: 0
  }, {
    question: "What is the main ingredient used in guacamole?",
    options: ["Avocado", "Tomato", "Pumpkin"],
    indexAnswer: 0
  }, {
    question: "What food does the Giant Panda mainly eat?",
    options: ["Bamboo", "Leaves", "Grass"],
    indexAnswer: 0
  }, {
    question: "What is the main ingredient of Hummus?",
    options: ["Beetroot", "Chickpeas", "Red beans"],
    indexAnswer: 1
  }, {
    question: "What is the main export out of Cuba?",
    options: ["Salt", "Oil", "Sugar"],
    indexAnswer: 2
  }, {
    question: "What is Venison?",
    options: ["Rabbit meat", "Bird meat", "Deer meat"],
    indexAnswer: 2
  }, {
    question: "What is Tofu made of?",
    options: ["Milk", "Soya beans", "Nuts"],
    indexAnswer: 1
  }, {
    question: "Which country does parmesan cheese originate from?",
    options: ["France", "Italy", "Germany"],
    indexAnswer: 1
  }, {
    question: "Fajitas are widely eaten in which country?",
    options: ["UK", "Singapore", "Mexico"],
    indexAnswer: 2
  }];

  var curQuestion = 0;
  var player1Points = 0;
  var player2Points = 0;
  var gameOver = false;

  //Randomize the questions
  questions.sort(function() {
    return 0.5 - Math.random()
  });

  function updateDisplay() {
    console.log("curQuestion in the deginning of update display" + curQuestion);

    if (gameOver) {
      var winner = whoWon();
      console.log("Winner is" + winner);
      switch (winner) {
        case 1:
          $('h2').html(' Gameover! Winner is Player 1');
          $('#red').attr('disabled', true);
          $('#green').attr('disabled', true);
          $('#blue').attr('disabled', true);
          break;
        case 2:
          $('h2').html(' Gameover! Winner is Player 2');
          $('#red').attr('disabled', true);
          $('#green').attr('disabled', true);
          $('#blue').attr('disabled', true);
          break;
        case 3:
          $('h2').html(' Gameover! Game is a draw');
          $('#red').attr('disabled', true);
          $('#green').attr('disabled', true);
          $('#blue').attr('disabled', true);
          break;
        default:
      }
    } else {
      $('h2').html('Game in Progress: Question ' + (curQuestion + 1) + ' of  ' + numberOfQuestions());
      $('h1').html(questions[curQuestion].question);

      $('#red').html(questions[curQuestion].options[0]);
      $('#green').html(questions[curQuestion].options[1]);
      $('#blue').html(questions[curQuestion].options[2]);
      $('h3').eq(0).html('Player 1: ' + player1Points);
      $('h3').eq(1).html('Player 2: ' + player2Points);

      //update which player's turn
      if (curQuestion % 2 === 0) {
        $('h4').html("Player 1's turn ");
      } else {
        $('h4').html("Player 2's turn ");
      }

    }

  }

  function numberOfQuestions() {
    console.log("numberOfQuestions" + questions.length);
    return questions.length;
  }


  function currentQuestion() {
    console.log("currentQuestion" + curQuestion);
    return curQuestion;
  }


  function correctAnswer(curQuestion) {
    console.log("checkAnswer" + questions[curQuestion].indexAnswer);
    return questions[curQuestion].indexAnswer;
  }



  function numberOfAnswers(curQuestion) {
    console.log("numberOfAnswers" + questions[curQuestion].options.length);
    return questions[curQuestion].options.length;
  }
  




  function playTurn(choice) {

    var x = false;

    if (choice === questions[curQuestion].options[correctAnswer(curQuestion)]) {
      console.log("Answer correct" + questions[curQuestion].options[correctAnswer(curQuestion)]);
      x = true;
      if (curQuestion % 2 === 0) {
        player1Points++;
        console.log("player 1 points ", player1Points);
      } else {
        player2Points++
        console.log("player 2 points ", player2Points);
      }

    }
    curQuestion++;
    console.log("curQuestion" + curQuestion);
    if (curQuestion === numberOfQuestions()) {
      $('h3').eq(0).html('Player 1: ' + player1Points);
      $('h3').eq(1).html('Player 2: ' + player2Points);
      gameOver = true;

    }
    console.log("Value of correct" + x);
    return x;
  }


  function isGameOver() {
    return gameOver;
  }

  function whoWon() {
    if (gameOver === true) {
      if (player1Points > player2Points) {
        // $('h2').html("Player 1 won");
        // console.log("Player 1 won");
        return 1;
      } else if (player2Points > player1Points) {

        return 2;
      } else if (player2Points = player1Points) {

        return 3;
      }
    } else {
      console.log("Game is in progress");
      return 0;
    }
  }

  function restart() {
    //Reload page from server not from cache
    location.reload(true);
  }

  $('.restart').click(function() {
    console.log('clicked on restart');
    restart();
    updateDisplay();
  });

  $(function() {
    $('.quizanswers').click(function() {
        // if gameover then restart else keep playing
        if (gameOver) {
          restart();
        } else {
          playTurn($(this).html());
          console.log($(this).html());
        }
        updateDisplay();
      })
      // update the display for the first time
    updateDisplay();
  })
});
