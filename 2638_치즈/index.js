const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const arr = [];
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

for (let i = 1; i <= N; i++) {
  const row = input[i].split(" ").map(Number);
  arr.push(row);
}

function ExternalBFS() {
  const queue = [];
  queue.push([0, 0]);
  visited[0][0] = true;
  let index = 0;

  while (index < queue.length) {
    const [x, y] = queue[index++];
    arr[x][y] = 2;

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (arr[nx][ny] !== 1 && !visited[nx][ny]) {
          queue.push([nx, ny]);
          visited[nx][ny] = true;
        }
      }
    }
  }
}

function CheeseBFS(cx, cy, point) {
  const queue = point;
  let index = 0;

  visited.map((visit) => {
    visit.fill(false);
  });

  ExternalBFS();

  while (index < queue.length) {
    const [x, y] = queue[index++];

    let external = 0;
    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (arr[nx][ny] === 2) {
          external++;
        }
      }
    }

    if (external >= 2) {
      arr[x][y] = 0;
    }
  }
}

let flag = true;
let day = 0;
while (flag) {
  flag = false;
  const point = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 1) {
        flag = true;
        point.push([i, j]);
      }
    }
  }

  if (flag) {
    day++;
    CheeseBFS(point[0][0], point[0][1], point);
  }
}

console.log(day);
