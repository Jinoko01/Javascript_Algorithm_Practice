const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const sudoku = Array.from({ length: 9 }, () => null);
let blank1 = 0;

for (let i = 0; i < 9; i++) {
  sudoku[i] = input[i].trim().split("").map(Number);
  for (let j = 0; j < 9; j++) {
    if (sudoku[i][j] === 0) blank1++;
  }
}

let end = false;

function print(sudoku) {
  let answer = "";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      answer += sudoku[i][j];
    }
    answer += "\n";
  }
  console.log(answer.trim());
}

function check(x, y, sudoku, k) {
  // 가로 확인
  for (let i = 0; i < 9; i++) {
    if (sudoku[y][i] === k) return false;
  }
  // 세로 확인
  for (let i = 0; i < 9; i++) {
    if (sudoku[i][x] === k) return false;
  }
  // 사각형 확인
  const sqaureX = Math.floor(x / 3) * 3;
  const squareY = Math.floor(y / 3) * 3;
  for (let i = squareY; i < squareY + 3; i++) {
    for (let j = sqaureX; j < sqaureX + 3; j++) {
      if (sudoku[i][j] === k) return false;
    }
  }
  return true;
}

function solution(sudoku, blank) {
  if (blank === 0) {
    print(sudoku);
    end = true;
  }
  if (end) return 0;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // 비어있는 자리 확인
      if (sudoku[i][j] === 0) {
        // 1부터 9까지 넣어본다
        for (let k = 1; k <= 9; k++) {
          if (check(j, i, sudoku, k)) {
            sudoku[i][j] = k;
            solution(sudoku, blank - 1);
            sudoku[i][j] = 0;
          }
          if (k === 9) return;
        }
      }
    }
  }
}

solution(sudoku, blank1);
