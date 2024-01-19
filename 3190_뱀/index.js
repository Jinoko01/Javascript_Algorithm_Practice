const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const move = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let dir = 0;
const moveTime = [];
let cnt = 0;
let index = 2;

const N = Number(input[0]);
const K = Number(input[1]);

const map = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

for (let i = 0; i < K; i++) {
  const [r, c] = input[index++].split(" ").map(Number);
  map[r - 1][c - 1] = 1;
}

const L = Number(input[index++]);

for (let i = 0; i < L; i++) {
  moveTime.push(input[index++].trim().split(" "));
}

for (let i = 0; i < L; i++) {
  moveTime[i][0] = Number(moveTime[i][0]);
}

function isInline(x, y) {
  return x >= 0 && x < N && y >= 0 && y < N;
}

function Rotation(index) {
  if (moveTime[index][1] === "D") {
    return dir === 3 ? 0 : dir + 1;
  } else if (moveTime[index][1] === "L") {
    return dir === 0 ? 3 : dir - 1;
  }
}

function game() {
  map[0][0] = 2;
  let [x, y] = [0, 0];
  let rotation = 0;
  let queue = [];
  queue.push([0, 0]);
  while (true) {
    cnt++;
    const [dx, dy] = [x + move[dir][0], y + move[dir][1]];
    // 벽이나 몸에 닿으면 종료
    if (!isInline(dx, dy) || map[dx][dy] === 2) {
      return cnt;
    } else {
      if (map[dx][dy] === 1) {
        // 이동한 칸에 사과가 있을 경우
        map[dx][dy] = 2;
        queue.push([dx, dy]);
      } else {
        // 사과가 없을 경우
        map[dx][dy] = 2;
        queue.push([dx, dy]);
        if (queue.length) {
          const [bx, by] = queue.shift();
          map[bx][by] = 0;
        }
      }
    }
    if (rotation < moveTime.length) {
      if (moveTime[rotation][0] === cnt) {
        dir = Rotation(rotation);
        rotation++;
      }
    }
    x = dx;
    y = dy;
  }
}
console.log(game());
