const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const N = Number(fs.readFileSync(filePath).toString().trim());

const DP = new Array(N + 1).fill(0);
DP[0] = 1;

for (let i = 2; i <= N; i += 2) {
  DP[i] = 3 * DP[i - 2];
  for (let j = i - 4; j >= 0; j -= 2) {
    DP[i] += 2 * DP[j];
  }
}

console.log(DP[N]);
