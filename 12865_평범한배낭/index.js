const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((ele) => ele.split(" ").map(Number));
const [N, K] = input.shift();
const dp = Array.from({ length: K + 1 }, () =>
  Array.from({ length: N + 1 }, () => 0)
);

for (let i = 1; i <= K; i++) {
  for (let j = 1; j <= N; j++) {
    const [weight, value] = input[j - 1];
    if (i - weight >= 0) {
      dp[i][j] = Math.max(dp[i - weight][j - 1] + value, dp[i][j - 1]);
    } else {
      dp[i][j] = dp[i][j - 1];
    }
  }
}
console.log(dp[K][N]);
