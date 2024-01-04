const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());

let DP = [];

for (const next of input) {
  const [n, k] = next.split(" ").map(Number);
  DP[n] = k;
}

DP = DP.filter((ele) => ele);
const LIS = new Array(DP.length).fill(1);

for (let i = 1; i < DP.length; i++) {
  let length = 1;
  for (let j = 0; j < i; j++) {
    if (DP[i] > DP[j]) {
      length = Math.max(length, LIS[j] + 1);
    }
  }
  LIS[i] = length;
}

let max = 0;
for (let i = 0; i < N; i++) {
  max = Math.max(max, LIS[i]);
}

console.log(N - max);
