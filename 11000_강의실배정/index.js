const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = Number(input[0]);
const arr = [];

for (let i = 1; i <= N; i++) {
  const [s, e] = input[i].split(" ").map(Number);
  arr.push([s, 1]);
  arr.push([e, -1]);
}

arr.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

let answer = 0;
let result = 0;

for (let i = 0; i < arr.length; i++) {
  result += arr[i][1];
  answer = Math.max(result, answer);
}

console.log(answer);
