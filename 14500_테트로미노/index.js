const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const map = input.map((line) => line.split(" ").map(Number));
const offset = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => false)
);

let max = 0;

const isInline = (x, y) => {
  return x >= 0 && x < n && y >= 0 && y < m;
};

const dfs = (x, y, cnt, sum) => {
  if (cnt === 4) {
    max = Math.max(max, sum);
    return;
  }

  for (const [dx, dy] of offset) {
    const nx = x + dx;
    const ny = y + dy;

    if (isInline(nx, ny) && !visited[nx][ny]) {
      if (cnt === 2) {
        visited[nx][ny] = true;
        dfs(x, y, cnt + 1, sum + map[nx][ny]);
        visited[nx][ny] = false;
      }
      visited[nx][ny] = true;
      dfs(nx, ny, cnt + 1, sum + map[nx][ny]);
      visited[nx][ny] = false;
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    visited[i][j] = true;
    dfs(i, j, 1, map[i][j]);
    visited[i][j] = false;
  }
}

console.log(max);
