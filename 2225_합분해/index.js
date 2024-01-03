const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const [N, K] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const DP = Array.from({ length: K + 1 }, () =>
  Array.from({ length: N + 1 }, () => 0)
);
DP[0][0] = 1;

for (let i = 0; i <= K; i++) {
  for (let j = 0; j <= N; j++) {
    for (let k = 0; k <= j; k++) {
      if (i - 1 >= 0) {
        DP[i][j] += DP[i - 1][j - k];
        DP[i][j] %= 1000000000;
      }
    }
  }
}

console.log(DP[K][N]);
