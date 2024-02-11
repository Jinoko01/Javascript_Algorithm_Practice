const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const [L, C] = input[0].split(" ").map(Number);

const arr = input[1].split(" ");
arr.sort();
let result = "";
const output = [];
const moeum = ["a", "e", "i", "o", "u"];

function dfs(idx, cnt) {
  if (cnt === L) {
    let flag = false;
    let cnt = 0;
    for (const e of output) {
      let wordFlag = false;
      for (let i = 0; i < 5; i++) {
        if (e === moeum[i]) {
          flag = true;
          wordFlag = true;
        }
      }
      if (!wordFlag) cnt++;
    }
    if (flag && cnt >= 2) result += `${output.join("")}\n`;
    return;
  }

  for (let i = idx; i < C; i++) {
    output.push(arr[i]);
    dfs(i + 1, output.length);
    output.pop();
  }
}

dfs(0, 0);
console.log(result);
