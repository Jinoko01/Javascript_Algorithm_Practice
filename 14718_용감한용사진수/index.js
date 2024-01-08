const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const monster = new Array(N).fill(null);

for (let i = 1; i < input.length; i++) {
  monster[i - 1] = input[i].split(" ").map(Number);
}

let min = Infinity;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < N; k++) {
      let cnt = 0;

      for (let l = 0; l < N; l++) {
        if (
          monster[i][0] >= monster[l][0] &&
          monster[j][1] >= monster[l][1] &&
          monster[k][2] >= monster[l][2]
        ) {
          cnt++;
        }
      }

      if (cnt >= K) {
        min = Math.min(min, monster[i][0] + monster[j][1] + monster[k][2]);
      }
    }
  }
}

console.log(min);
