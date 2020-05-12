const input = document.querySelector("#input");
const button = document.querySelector("#button");
const logs = document.querySelector("#logs");
let count = 0;
let answer;

// 정답 생성
randomAnswer = () => {
  const numbers = [];
  for (let n = 0; n < 10; n++) {
    numbers.push(n);
  }
  const answerArray = [];
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    answerArray.push(numbers[index]);
    numbers.splice(index, 1);
  }
  return answerArray.join("");
};

// CLICK EVENT
check = () => {
  const value = input.value;
  if (value && value.length === 4) {
    if (value === answer) {
      // HOMERUN
      logs.appendChild(document.createTextNode(`HR : ${answer}`));
      logs.appendChild(document.createElement("br"));
      logs.appendChild(document.createElement("br"));
      answer = randomAnswer();
      count = 0;
    } else {
      // STRIKE, BALL
      count++;
      let strike = 0;
      let ball = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (answer[i] === value[j]) {
            if (i === j) {
              strike++;
            } else {
              ball++;
            }
          }
        }
      }
      logs.appendChild(
        document.createTextNode(`[${count}] ${strike}S ${ball}B : ${value}`)
      );
      logs.appendChild(document.createElement("br"));
      // log.append(`[${count}] ${strike}S ${ball}B : ${value}`, 'br');
    }
  } else {
    // 입력 오류
    alert("ERROR!");
  }
  // count 10회 되면 GAME OVER
  if (count === 10) {
    logs.appendChild(document.createTextNode(`Game Over : ${answer}`));
    logs.appendChild(document.createElement("br"));
    logs.appendChild(document.createElement("br"));
    answer = randomAnswer();
    count = 0;
  }
  // INPUT 초기화
  input.value = "";
  input.focus();
};

function enterEvent() {
  document.addEventListener("keydown", (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) {
      // Enter key
      check();
    }
  });
}

function init() {
  answer = randomAnswer();
  button.addEventListener("click", check);
  enterEvent();
}

init();
