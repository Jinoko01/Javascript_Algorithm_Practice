const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());

const DP = input.shift().split(" ").map(Number);

const LIS = Array.from({ length: N }, () =>
  Array.from({ length: 2 }, () => null)
);

for (let i = 0; i < LIS.length; i++) {
  LIS[i][0] = 1;
}

for (let i = 1; i < N; i++) {
  let length = 1;
  for (let j = 0; j < i; j++) {
    if (DP[i] > DP[j]) {
      if (LIS[j][0] + 1 > length) {
        length = LIS[j][0] + 1;
        LIS[i][1] = j;
      }
    }
  }
  LIS[i][0] = length;
}

let max = 0;
let maxIndex = 0;
for (let i = 0; i < N; i++) {
  if (max < LIS[i][0]) {
    max = LIS[i][0];
    maxIndex = i;
  }
}

console.log(max);

let cur = maxIndex;
const path = [];
while (LIS[cur][1] !== null) {
  path.unshift(DP[cur]);
  cur = LIS[cur][1];
}
path.unshift(DP[cur]);

for (const ele of path) {
  process.stdout.write(`${ele} `);
}
