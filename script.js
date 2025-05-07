document.addEventListener("DOMContentLoaded", () => {
    let questions = [];
    let currentQuestionIndex = 0;
    let revealed = [];
    let strikes = 0;
    let score = 0;
  
    const answerBoard = document.getElementById("answers");
    const strikeDisplay = document.getElementById("strikes");
    const scoreDisplay = document.getElementById("score");
    const questionText = document.getElementById("question-text");
  
    fetch("questions.json")
      .then((res) => res.json())
      .then((data) => {
        questions = data;
      });
  
    document.getElementById("start-button").addEventListener("click", () => {
      document.getElementById("start-screen").style.display = "none";
      document.getElementById("game-screen").style.display = "block";
      loadQuestion();
    });
  
    window.checkGuess = function () {
      const input = document.getElementById("guessInput");
      const guess = input.value.trim().toLowerCase();
      input.value = "";
  
      const q = questions[currentQuestionIndex];
      let correct = false;
  
      q.answers.forEach((a, i) => {
        if (!revealed[i] && a.answer.toLowerCase().includes(guess)) {
          document.getElementById(`answer-${i}`).classList.add("revealed");
          document.getElementById(`answer-${i}`).innerHTML = `${i + 1}. ${a.answer} - ${a.points} pts`;
          revealed[i] = true;
          score += a.points;
          scoreDisplay.textContent = `Score: ${score}`;
          correct = true;
        }
      });
  
      if (!correct) {
        strikes++;
        strikeDisplay.innerHTML = `Strikes: ${"❌".repeat(strikes)}${"⬜".repeat(3 - strikes)}`;
        if (strikes >= 3) {
          alert("Three strikes! Game Over.");
        }
      }
    };
  
    function loadQuestion() {
      const q = questions[currentQuestionIndex];
      revealed = new Array(q.answers.length).fill(false);
      strikes = 0;
      score = 0;
      strikeDisplay.innerHTML = "Strikes: ❌ ❌ ❌";
      scoreDisplay.textContent = `Score: 0`;
      questionText.textContent = q.question;
      answerBoard.innerHTML = "";
  
      q.answers.forEach((a, i) => {
        const div = document.createElement("div");
        div.className = "answer";
        div.id = `answer-${i}`;
        div.innerHTML = `${i + 1}. _______`;
        answerBoard.appendChild(div);
      });
    }
  });
  
