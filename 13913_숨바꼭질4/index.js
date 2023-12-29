const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [N, K] = [input[0], input[1]];
const visited = new Array(100001).fill(0);
let path = new Array(100001).fill(0);

function bfs() {
  let L = 0;
  let queue = [];
  queue.push(N);
  visited[N] = 1;
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let x = queue.shift();
      if (x === K) {
        return L;
      }
      for (let nx of [x + 1, x - 1, x * 2]) {
        if (visited[nx] === 0 && nx >= 0 && nx <= 100000) {
          path[nx] = x;
          visited[nx] = 1;
          queue.push(nx);
        }
      }
    }
    L++;
  }
}

let time = bfs();
let ans = [];
let before = path[K];
ans.push(K);
for (let i = 0; i < time; i++) {
  ans.push(before);
  before = path[before];
}
console.log(`${time}\n${ans.reverse().join(" ")}`);
