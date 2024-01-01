const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const coinArr = [];

for (let i = 0; i < N; i++) {
  coinArr.push(Number(input.shift()));
}

const DP = new Array(K + 1).fill(Infinity);

DP[0] = 0;
for (let i = 0; i < N; i++) {
  for (let j = coinArr[i]; j <= K; j++) {
    DP[j] = Math.min(DP[j], DP[j - coinArr[i]] + 1);
  }
}

DP[K] === Infinity ? console.log(-1) : console.log(DP[K]);
