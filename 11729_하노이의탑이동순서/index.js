const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const n = Number(input[0]);
let cnt = 0;
let path = "";

const movePlate = (start, end) => {
  path += `${start} ${end}\n`;
  cnt++;
};

const hanoi = (plateNum, start, sub, end) => {
  if (plateNum === 1) {
    movePlate(start, end);
    return;
  }

  hanoi(plateNum - 1, start, end, sub);
  movePlate(start, end);
  hanoi(plateNum - 1, sub, start, end);
};

hanoi(n, 1, 2, 3);
console.log(cnt);
console.log(path.trim());
