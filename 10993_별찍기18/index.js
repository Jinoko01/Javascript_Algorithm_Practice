const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
// const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = Number(fs.readFileSync(filePath, "utf8"));
const x_size = 2 ** (N + 1) - 3;
const y_size = 2 ** N - 1;

const arr = Array.from({ length: 2 ** N - 1 }, () =>
  Array.from({ length: 2 ** (N + 1) - 3 }, () => " ")
);

function draw(x, y, n) {
  if (n === 1) {
    arr[y][x] = "*";
    return;
  }

  const x_size2 = 2 ** (n + 1) - 3;
  const y_size2 = 2 ** n - 1;

  // n이 홀수
  if (n % 2 !== 0) {
    for (let i = 0; i < x_size2; i++) arr[y][x + i] = "*";
    for (let i = 0; i < y_size2; i++) arr[y - i][x + i] = "*";
    for (let i = 0; i < y_size2; i++) arr[y - i][x + x_size2 - i - 1] = "*";
    draw(x + 2 ** (n - 1), y - (2 ** (n - 1) - 1), n - 1);
  }
  // n이 짝수
  else {
    for (let i = 0; i < x_size2; i++) arr[y][x + i] = "*";
    for (let i = 0; i < y_size2; i++) arr[y + i][x + i] = "*";
    for (let i = 0; i < y_size2; i++) arr[y + i][x + x_size2 - i - 1] = "*";
    draw(x + 2 ** (n - 1), y + (2 ** (n - 1) - 1), n - 1);
  }
}

// N이 짝수
if (N % 2 !== 0) {
  draw(0, y_size - 1, N);
}
// N이 홀수
else {
  draw(0, 0, N);
}

for (const row of arr) {
  console.log(row.join("").trimEnd());
}
