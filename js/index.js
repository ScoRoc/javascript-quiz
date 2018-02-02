var results = [];
// var questionAnswers = [];
var correctAnswer = "";
var score = 0;
var start = $(".start");
var next = $(".next");
var currentQuestion = 0;
var currentQuestionBox = $('.current-question-box p');
var restartButton = $('.restart-button');

var startQuiz = function() {
  score = 0;
  currentQuestion = 0;
  $('.score').css('display', 'none');
  start.css("display", "none")
  restartButton.css('display', 'none');
  next.css('display', 'inline');
  $.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple', {

  }).done(function(data) {

    results = data.results;

for (var i = 0; i < results.length; i++) {
  var randNum = Math.floor(Math.random() * 4);
  var allAnswers = [];
  var answerRandomOrder = [];
  correctAnswer = results[i].correct_answer;
  allAnswers = allAnswers.concat(results[i].incorrect_answers);
  allAnswers.push(correctAnswer);
  results[i].allAnswers = allAnswers;
  console.log(correctAnswer);
      //generating random array
  for (var j = 0; j < allAnswers.length; j++) {
    var randNum = Math.floor(Math.random() * 4);
    if (!answerRandomOrder.includes(allAnswers[randNum])) {
      answerRandomOrder.push(allAnswers[randNum]);

    } else {
      j--;
    }
  };
  results[i].answerRandomOrder = answerRandomOrder;
}

  console.log(results);


  var question = $("<h4>" + results[currentQuestion].question + "</h4>");
  var answer0 = $("<li>" + results[currentQuestion].answerRandomOrder[0] + "</li>");
  var answer1 = $("<li>" + results[currentQuestion].answerRandomOrder[1] + "</li>");
  var answer2 = $("<li>" + results[currentQuestion].answerRandomOrder[2] + "</li>");
  var answer3 = $("<li>" + results[currentQuestion].answerRandomOrder[3] + "</li>");
  var questionList = $("<ol class='questionOl'> </ol>");

  $(".quizbox").append(question);
  $(".quizbox").append(questionList);
  $(".quizbox ol").append(answer0).append(answer1).append(answer2).append(answer3);

  var checkforanswer = function(){


    if( $(this).text() === results[currentQuestion].correct_answer){
       $(this).css("color", "green");
       score+=10;
       currentQuestion += 1;
    }else {
      $(this).css("color", "red");
      currentQuestion += 1;
      $(".questionOl").off("click", "li", checkforanswer);
    };
  };

  $(".questionOl").on("click", "li", checkforanswer);

var endGame = function() {
  $('.quizbox').empty();
  currentQuestionBox.empty();
  $('.score').html('Score: '+ score);
  $('.score').css('display', 'block');
  next.css('display', 'none');
  restartButton.css('display', 'inline');
};

  var nextQuestion = function() {
    if (currentQuestion < 10) {
      $('.quizbox').empty();
      currentQuestionBox.text('Current Question: ' + (currentQuestion + 1));
      var question = $("<h4>" + results[currentQuestion].question + "</h4>");
      var answer0 = $("<li>" + results[currentQuestion].answerRandomOrder[0] + "</li>");
      var answer1 = $("<li>" + results[currentQuestion].answerRandomOrder[1] + "</li>");
      var answer2 = $("<li>" + results[currentQuestion].answerRandomOrder[2] + "</li>");
      var answer3 = $("<li>" + results[currentQuestion].answerRandomOrder[3] + "</li>");
      var questionList = $("<ol class='questionOl'> </ol>");
console.log(currentQuestion);
      $(".quizbox").append(question);
      $(".quizbox").append(questionList);
      $(".quizbox ol").append(answer0).append(answer1).append(answer2).append(answer3);
      $(".questionOl").on("click", "li", checkforanswer);
    } else {
      endGame();
    }
  };
  currentQuestionBox.text('Current Question: 1');
  next.on("click", nextQuestion);

    });   //end of .done
};

start.on("click", startQuiz);
restartButton.on('click', startQuiz);
