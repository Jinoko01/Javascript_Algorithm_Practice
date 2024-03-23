const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map(e => e.trim());

const [S, T] = input;

let deque = input[1].split("");
let dir = "left";
// 뒤에서부터 문자 검증 -> 기본 left
for (let i = 0; i < T.length - S.length; i++) {
  if (dir === "left") {
    let check = deque.pop();
    if (check === "B") {
      dir = "right";
    }
  } else {
    let check = deque.shift();
    if (check === "B") {
      dir = "left";
    }
  }
}
if(dir === "right"){
  deque.reverse()
}
if (deque.join("") === S) {
  console.log(1);
} else {
  console.log(0);
}