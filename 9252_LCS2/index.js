const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const string1 = input[0].trim().split("");
const string2 = input[1].split("");

const [n, m] = [string1.length, string2.length];

const DP = Array.from({ length: n + 1 }, () =>
  Array.from({ length: m + 1 }, () => [0, ""])
);

let max = 0;
let maxstr = "";
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    if (string1[i - 1] === string2[j - 1]) {
      DP[i][j][0] = DP[i - 1][j - 1][0] + 1;
      DP[i][j][1] = DP[i - 1][j - 1][1].concat(string1[i - 1]);
    } else {
      if (DP[i - 1][j][0] > DP[i][j - 1][0]) {
        DP[i][j] = DP[i - 1][j];
      } else {
        DP[i][j] = DP[i][j - 1];
      }
    }
    if (max < DP[i][j][0]) {
      max = DP[i][j][0];
      maxstr = DP[i][j][1];
    }
  }
}

console.log(max);
console.log(maxstr);
