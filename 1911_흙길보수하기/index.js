const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const [N, L] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i <= N; i++) {
  const [s, e] = input[i].split(" ").map(Number);
  arr.push([s, e]);
}

arr.sort((a, b) => a[0] - b[0]);

let [min, max] = [0, 0];
let cnt = 0;

for (const [start, end] of arr) {
  if (max < start) {
    cnt += Math.ceil((max - min) / L);
    min = start;
    max = min + L * Math.ceil((end - min) / L);
  }

  if (max >= start && max < end) {
    max = min + L * Math.ceil((end - min) / L);
  }
}
cnt += Math.ceil((max - min) / L);

console.log(cnt);
