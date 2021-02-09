const API_URL =
  "https://opentdb.com/api.php?amount=25&type=multiple&category=18";
const DB_URL = "https://6016417c55dfbd00174cabaa.mockapi.io/Database";
let userName = "";
let currentQuestion;
let currentIndex = 0;
let data;
let score = 0;
let timeRemaining = 120;
let time;

const fetchData = (url) => {
  try {
    let data = fetch(url).then((data) => data.json());
    return data;
  } catch (err) {
    console.log(err);
  }
};

const handleUserNameSubmit = async () => {
  userName = document.querySelector(".user-name").value;
  data = await fetchData(API_URL);
  buildQuestionPage();
  let body = document.querySelector("body");
  body.classList.add("paused"); // Pausing Animation
  time = setInterval(() => {
    if (timeRemaining !== 0) {
      timeRemaining--;
      document.querySelector(
        ".time-remaining"
      ).innerText = `Time Remaining : ${timeRemaining}`;
    } else {
      buildGameOverPage();
    }
  }, 1000);
};

const buildLeaderboard = async () => {
  let data = await fetchData(DB_URL);
  let container = document.querySelector(".container-fluid");
  container.classList.add("no-flex", "pt-5");
  let topWrapper = document.querySelector(".top-wrapper");
  let tableRows = "";
  let i = 1;
  for (let elm of data[0].leaderboard) {
    tableRows += `<tr>
      <td><h3 class="heading">${i}</h3></td>
      <td><h3 class="heading">${elm.name}</h3></td>
      <td><h3 class="heading">${elm.score}</h3></td>
    </tr>`;
    i++;
  }
  let topWrapperItem = `
  <h1 class="heading"><a class="view-leaderboard" href=""><i class="fas fa-long-arrow-alt-left"></i></a> Leaderboard</h1>
  <table class="table table-bordered leaderboard">
    <thead>
      <tr>
        <th><h3 class="heading">#</h3></th>
        <th><h3 class="heading">Name</h3></th>
        <th><h3 class="heading">Score</h3></th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
  `;
  topWrapper.innerHTML = topWrapperItem;
};

const buildQuestionPage = () => {
  let topWrapper = document.querySelector(".top-wrapper");
  currentQuestion = data.results[currentIndex];
  let randomNumber = Math.floor(Math.random() * 4);
  let options = "";
  let j = 0;
  for (let i = 0; i < 4; i++) {
    if (i === randomNumber) {
      options += `<div class="col-sm-6"><div class="option-btn btn correct-ans" onclick="checkCorrectAnswer(this)">${currentQuestion.correct_answer}</div></div>`;
    } else {
      options += `<div class="col-sm-6"><div class="option-btn btn" onclick="checkCorrectAnswer(this)">${currentQuestion.incorrect_answers[j]}</div></div>`;
      j++;
    }
  }

  let topWrapperItem = `<div class="wrapper">
    <h1 class="heading question">${currentQuestion.question}</h1>
    <div class="row option-btn-group">
      ${options}
    </div>
    <div>
    <p>${currentIndex + 1}/${data.results.length}</p>
      <h3 class="heading">Current Score : ${score}</h3>
      <h3 class="heading time-remaining">Time Remaining : ${timeRemaining} </h3>
    </div>
  </div>`;
  topWrapper.innerHTML = topWrapperItem;
};

const checkCorrectAnswer = (selectedOption) => {
  if (timeRemaining > 1) {
    if (currentQuestion.correct_answer === selectedOption.innerText) {
      selectedOption.classList.add("correct");
      score++;
      setTimeout(() => {
        if (currentIndex !== data.results.length - 1) {
          currentIndex++;
          buildQuestionPage();
        } else {
          buildGameOverPage();
        }
      }, 1000);
    } else {
      document.querySelector(".correct-ans").classList.add("correct");
      selectedOption.classList.add("wrong");
      setTimeout(() => {
        if (currentIndex !== data.results.length - 1) {
          currentIndex++;
          buildQuestionPage();
        } else {
          buildGameOverPage();
        }
      }, 1000);
    }
  }
};

const updateLeaderBoard = async () => {
  let data = await fetchData(DB_URL);
  data = data[0].leaderboard;
  let gameResult = { name: userName, score: score };
  data.push(gameResult);
  data = data.sort((a, b) => b.score - a.score);
  data = data.slice(0, 10);
  data = { leaderboard: data };
  let response = await fetch(DB_URL + "/" + 1, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  response = await response.json();
};

const buildGameOverPage = async () => {
  clearInterval(time);
  await updateLeaderBoard();
  let data = await fetchData(DB_URL);
  let tableRows = "";
  let i = 1;
  for (let elm of data[0].leaderboard) {
    tableRows += `<tr>
      <td><h3 class="heading">${i}</h3></td>
      <td><h3 class="heading">${elm.name}</h3></td>
      <td><h3 class="heading">${elm.score}</h3></td>
    </tr>`;
    i++;
  }
  let body = document.querySelector("body");
  body.classList.remove("paused"); //Pausing Animation
  let container = document.querySelector(".container-fluid");
  container.classList.add("no-flex", "pt-5");
  let topWrapper = document.querySelector(".top-wrapper");
  let topWrapperItem = `<h1 class="heading"><a href="" class="view-leaderboard"><i class="fas fa-long-arrow-alt-left"></i></a>  Your score : ${score}</h1>
  <h1 class="heading">Leaderboard</h1>
  <table class="table table-bordered leaderboard">
    <thead>
      <tr>
        <th><h3 class="heading">#</h3></th>
        <th><h3 class="heading">Name</h3></th>
        <th><h3 class="heading">Score</h3></th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
  `;
  topWrapper.innerHTML = topWrapperItem;
};

document.querySelector(".user-name").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleUserNameSubmit();
  }
});

