const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const m = [0].concat(input[1].split(" ").map(Number));
const c = [0].concat(input[2].split(" ").map(Number));

const dp = Array.from({ length: M + 1 }, () => -1);
dp[0] = 0;

for (let i = 1; i <= N; i++) {
  for (let j = M; j > 0; j--) {
    if (m[i] < j) {
      if (dp[j] !== -1) {
        dp[j] = Math.min(dp[j], c[i] + dp[j - m[i]]);
      } else {
        if (dp[j - m[i]] !== -1) {
          dp[j] = c[i] + dp[j - m[i]];
        } else {
          dp[j] = -1;
        }
      }
    } else {
      if (dp[j] !== -1) {
        dp[j] = Math.min(dp[j], c[i]);
      } else {
        dp[j] = c[i];
      }
    }
  }
}

console.log(dp[M]);
