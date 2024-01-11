const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const DP = new Array(N + 1).fill(0);

let max = 0;
for (let i = 1; i <= N; i++) {
  const num = arr[i - 1];
  DP[num] = DP[num - 1] + 1;
  max = Math.max(DP[num], max);
}
console.log(N - max);
