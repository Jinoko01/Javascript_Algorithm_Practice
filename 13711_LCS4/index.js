const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr1 = input[1].split(" ").map(Number);
const arr2 = input[2].split(" ").map(Number);

const memo = new Array(N).fill(null);

for (let i = 0; i < N; i++) {
  memo[arr2[i] - 1] = i;
}

for (let i = 0; i < N; i++) {
  arr2[i] = memo[arr1[i] - 1];
}

let up = [];
for (const x of arr2) {
  if (up.length === 0 || up[up.length - 1] < x) up.push(x);
  else {
    let left = 0;
    let right = up.length - 1;

    while (left < right) {
      let mid = parseInt((left + right) / 2);

      if (up[mid] >= x) right = mid;
      else left = mid + 1;
    }

    up[right] = x;
  }
}

console.log(up.length);
