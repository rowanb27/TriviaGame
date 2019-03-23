$(document).ready(function() {
  
  // Created a variable and set variable to an array of objects containing the following: question, choices, answer, 2 images(1 gif, 1 solved answer)

  var options = [
      {
          question: "What would be the value of x in the equation 2x + 5 = 11?",
          choice: ["3", "1/2", "6", "2/11"],
          answer: 0,
          correctImage: "assets\images\3.webp",
          incorrectImage: "assets\images\3.JPG"
      },

      {
          question: "assets\images\limit.jpg", 
          choice: ["-.455", "I give up", "0", "The limit does not exist"],
          answer: 3,
          correctImage: "assets\images\limitGif.webp",
          incorrectImage: "assets\images\limitGif.webp"
      },

      {
          question: "The Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5,... What is the next number in the sequence?",
          choice: ["10", "5", "8", "Math is hard"],
          answer: 2,
          correctImage: "assets\images\fibGif.webp",
          incorrectImage: "assets\images\fibonacci.jpg"
      },  

      {
          question: "What would be the value of x in the equation 2+2×2−2×2?",
          choice: ["2", "-2", "4", "8"],
          answer: 0,
          correctImage: "assets\images\orderOfOpsGif.webp",
          incorrectImage: "assets\images\orderOfOperations.JPG"
      } 
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess = "";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];

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
  











})