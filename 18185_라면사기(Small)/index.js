const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = Number(input[0]);

const arr = input[1].split(" ").map(Number);

let i = 0;
let money = 0;
while (i < N) {
  if (!arr[i]) {
    i++;
    continue;
  }
  if (arr[i] && arr[i + 1] && arr[i + 2]) {
    if (arr[i + 1] > arr[i + 2]) {
      let m = Math.min(arr[i], arr[i + 1] - arr[i + 2]);
      arr[i] -= m;
      arr[i + 1] -= m;
      money += m * 5;
    }
    let n = Math.min(arr[i], arr[i + 1], arr[i + 2]);
    arr[i] -= n;
    arr[i + 1] -= n;
    arr[i + 2] -= n;
    money += n * 7;
  } else if (arr[i] && arr[i + 1]) {
    if (arr[i] > arr[i + 1]) {
      let m = arr[i] - arr[i + 1];
      arr[i] -= m;
      money += m * 3;
    }
    let n = Math.min(arr[i], arr[i + 1]);
    arr[i] -= n;
    arr[i + 1] -= n;
    money += n * 5;
  } else if (arr[i]) {
    money += arr[i] * 3;
    arr[i] = 0;
  }
}

console.log(money);
