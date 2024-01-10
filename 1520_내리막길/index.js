const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [M, N] = input[0].split(" ").map(Number);
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
const map = [];

for (let i = 1; i <= M; i++) {
  map.push(input[i].split(" ").map(Number));
}

const DP = Array.from({ length: M }, () => Array.from({ length: N }, () => -1));

function DFS(x, y) {
  if ((x === M - 1) & (y === N - 1)) {
    return 1;
  }

  if (DP[x][y] !== -1) {
    return DP[x][y];
  }

  let H = 0;
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if ((ny >= 0) & (ny < N) & (nx >= 0) & (nx < M)) {
      if (map[nx][ny] < map[x][y]) {
        H += DFS(nx, ny);
      }
    }
  }

  DP[x][y] = H;
  return H;
}

console.log(DFS(0, 0));
