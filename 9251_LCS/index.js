const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const [string1, string2] = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((ele) => ele.trim());

const LCS = Array.from({ length: string1.length + 1 }, () =>
  Array.from({ length: string2.length + 1 }, () => 0)
);

let max = 0;
for (let i = 1; i <= string1.length; i++) {
  for (let j = 1; j <= string2.length; j++) {
    if (string1[i - 1] === string2[j - 1]) {
      LCS[i][j] = LCS[i - 1][j - 1] + 1;
    } else {
      LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
    }
    max = Math.max(max, LCS[i][j]);
  }
}
console.log(max);
