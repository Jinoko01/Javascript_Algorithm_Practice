const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

const min = [Infinity, 0, arr.length - 1];

let s = 0;
let e = arr.length - 1;

while (s < e) {
  if (arr[s] + arr[e] === 0) {
    min[0] = 0;
    min[1] = s;
    min[2] = e;
    break;
  }

  if (Math.abs(arr[s] + arr[e]) < Math.abs(arr[min[1]] + arr[min[2]])) {
    min[0] = arr[s] + arr[e];
    min[1] = s;
    min[2] = e;
  }

  if (arr[s] + arr[e] > 0) {
    e--;
  } else {
    s++;
  }
}

console.log(arr[min[1]], arr[min[2]]);
