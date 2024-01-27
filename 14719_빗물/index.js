const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const [H, W] = input[0].split(" ").map(Number);

const height = input[1].split(" ").map(Number);

let water = 0;

for (let i = 0; i < height.length; i++) {
  let left = -1;
  let right = -1;
  let min = 0;

  for (let j = i; j >= 0; j--) {
    left = Math.max(left, height[j]);
  }

  for (let j = i; j < height.length; j++) {
    right = Math.max(right, height[j]);
  }

  min = Math.min(left, right);
  water += min - height[i];
}

console.log(water);
