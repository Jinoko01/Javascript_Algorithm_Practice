const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((ele) => ele.split(" ").map(Number));

const [x1, y1] = input.shift();
const [x2, y2] = input.shift();
const [x3, y3] = input.shift();

const external1 = (x2 - x1) * (y3 - y1);
const external2 = (x3 - x1) * (y2 - y1);

if (external1 > external2) {
  console.log(1);
} else if (external1 < external2) {
  console.log(-1);
} else {
  console.log(0);
}
