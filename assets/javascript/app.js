$(document).ready(function() {
  
  // Created a variable and set variable to an array of objects containing the following: question, choices, answer, 2 images(1 gif, 1 solved answer)

  var options = [
      {
          question: "What would be the value of x in the equation 2x + 5 = 11?",
          choice: [ "3", "1/2", "6", "2/11" ],
          answer: 0,
          correctImage: "assets/images/3.webp",
          incorrectImage: "assets/images/3.JPG"
      },

      {
          question: "assets/images/limit.jpg", 
          choice: [ "-.455", "I give up", "0", "The limit does not exist" ],
          answer: 3,
          correctImage: "assets/images/limitGif.webp",
          incorrectImage: "assets/images/limitGif.webp"
      },

      {
          question: "The Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5,... What is the next number in the sequence?",
          choice: [ "10", "5", "8", "Math is hard" ],
          answer: 2,
          correctImage: "assets/images/fibGif.webp",
          incorrectImage: "assets/images/fibonacci.jpg"
      },  

      {
          question: "What would be the value of x in the equation 2+2×2−2×2?",
          choice: [ "2", "-2", "4", "8" ],
          answer: 0,
          correctImage: "assets/images/orderOfOpsGif.webp",
          incorrectImage: "assets/images/orderOfOperations.JPG"
      } 
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 12;
  var intervalId;
  var userGuess = "";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];

//Hide reset/'Play Again?' button
  $("#reset").hide();

  //Click the Start button to begin game
  $("#start").on("click", function() {
      $("#start").hide();
      displayQuestion();
      runTimer();
      for (var i = 0; i < options.length; i++) {
          holder.push(options[i]);
      }
  });

 //Start the Timer
  function runTimer() {
      if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
     }
  };

  //Timer countdown
  function decrement() {
      $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
      timer--;

      //Stop timer if reaches ZERO
      if (timer === 0) {
          unanswerCount++;
          stop();
          $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
          hidepicture();
       } 
  };
  
  //Stop the Timer
  function stop() {
      running = false;
      clearInterval(intervalId);
  };

  //Randomly pick unanswered question in array
  //Display question and loop through and display choices
  function displayQuestion() {
      index = Math.floor(Math.random()*options.length);
      pick = options[index];

       //Iterate through answer array and display
       //Create if/else statement in order for question[1] to appear as Image instead of String
       if (pick.question.startsWith("assets/images/limit.jpg")) {
           $("#questionblock").html("<img src=" + pick.question + ">");
       } else {
           $("#questionblock").html("<h2>" + pick.question + "</h2>");
       };
      for (var i = 0; i < pick.choice.length; i++) {
          var userChoice = $("<div>");
          userChoice.addClass("answerchoice");
          userChoice.html(pick.choice[i]);
          //assign array position to it so can check answer
          userChoice.attr("data-guessvalue", i);
          $("#answerblock").append(userChoice);

      }
       

  //Click function to select answer and outcomes
  $(".answerchoice").on("click", function() {
     //Grab array position from userGuess
       userGuess = parseInt($(this).attr("data-guessvalue"));

      //Correct guess or wrong guess outcomes
      if (userGuess === pick.answer) {
          stop();
          correctCount++;
          userGuess = "";
          $("#answerblock").html("<p>Correct!</p>");
          hideCorrectpicture();
      } else {
          stop();
          wrongCount++;
          userGuess = "";
          $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
          hidepicture();
      }
    });
  };

// Function to display IncorrectImage if answered wrong or if time runs out
  function hidepicture() {
      $("#answerblock").append("<img src=" + pick.incorrectImage + ">");
      newArray.push(pick);
      options.splice(index,1);

      var hidpic = setTimeout(function() {
          $("#answerblock").empty();
          timer = 12;

          //runs the score screen if all questions answered
          if ((wrongCount + correctCount + unanswerCount) === qCount) {
              $("#questionblock").empty();
              $("#questionblock").html("<h3>Game Over! Here's your scoresheet: </h3>");
              $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
              $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
              $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
              $("#reset").show();
              correctCount = 0;
              wrongCount = 0;
              unanswerCount = 0;
              $("#timeleft").hide();

          } else {
              runTimer();
              displayQuestion();
          }
      
        }, 3000);
  };

// Function to display correctImage if answered correct
   function hideCorrectpicture() {
      $("#answerblock").append("<img src=" + pick.correctImage + ">");
      newArray.push(pick);
      options.splice(index,1);

      var hidpic = setTimeout(function() {
          $("#answerblock").empty();
          timer = 12;

          //runs the scoresheet screen if all questions answered
          if ((wrongCount + correctCount + unanswerCount) === qCount) {
              $("#questionblock").empty();
              $("#questionblock").html("<h3>Game Over! Here's your scoresheet: </h3>");
              $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
              $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
              $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
              $("#reset").show();
              correctCount = 0;
              wrongCount = 0;
              unanswerCount = 0;
              $("#timeleft").hide();


          } else {
              runTimer();
              displayQuestion();
          }
      
        }, 3000);
  };

  $("#reset").on("click", function() {
      $("#reset").hide();
      $("#answerblock").empty();
      $("questionblock").empty();
      for (var i = 0; i <holder.length; i++) {
          options.push(holder[i]);
      };
      displayQuestion();
      runTimer();
  });
});