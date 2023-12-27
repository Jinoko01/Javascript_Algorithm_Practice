const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const map = input.map((line) => line.trim().split(""));
const offset = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);
let water = [];
let result = 0;

const isInline = (x, y) => {
  return x >= 0 && x < R && y >= 0 && y < C;
};

const waterBfs = () => {
  const queue = [];
  for (const [wx, wy] of water) {
    for (const [dx, dy] of offset) {
      const wnx = wx + dx;
      const wny = wy + dy;
      if (isInline(wnx, wny) && map[wnx][wny] === ".") {
        map[wnx][wny] = "*";
        queue.push([wnx, wny]);
      }
    }
  }
  water.push(...queue);
};

const hedgehogBfs = (sx, sy) => {
  const queue = [];
  queue.push([sx, sy, 0]);
  visited[sx][sy] = true;

  while (queue.length) {
    const qLen = queue.length;
    waterBfs();

    for (let i = 0; i < qLen; i++) {
      const [x, y, cnt] = queue.shift();
      if (map[x][y] === "D") {
        result = cnt;
        return;
      }

      for (const [dx, dy] of offset) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          isInline(nx, ny) &&
          !visited[nx][ny] &&
          !(map[nx][ny] === "*" || map[nx][ny] === "X")
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny, cnt + 1]);
        }
      }
    }
  }
};

let startX, startY;
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "*") {
      water.push([i, j]);
    }
    if (map[i][j] === "S") {
      startX = i;
      startY = j;
    }
  }
}

hedgehogBfs(startX, startY);

console.log(result || "KAKTUS");
