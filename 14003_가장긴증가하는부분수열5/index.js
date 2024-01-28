const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = Number(input[0]);

const arr = input[1].split(" ").map(Number);

let up = [];
const record = new Array(N).fill(null);
let recordMax = 0;
for (let i = 0; i < N; i++) {
  if (!up.length || up[up.length - 1] < arr[i]) {
    up.push(arr[i]);
    record[i] = up.length;
  } else {
    let left = 0;
    let right = up.length - 1;

    while (left < right) {
      let mid = parseInt((left + right) / 2);

      if (up[mid] >= arr[i]) right = mid;
      else left = mid + 1;
    }

    up[right] = arr[i];
    record[i] = right + 1;
  }
}

const result = new Array(up.length).fill(null);
let idx = 0;
recordMax = Math.max(...record);
for (let i = N - 1; i >= 0; i--) {
  if (record[i] === recordMax) {
    result[idx] = arr[i];
    idx++;
    recordMax--;
  }
  if (recordMax < 1) break;
}

console.log(up.length);
console.log(result.reverse().join(" "));
