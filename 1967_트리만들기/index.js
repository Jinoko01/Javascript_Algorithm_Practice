const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);

const weight = Array.from({ length: N + 1 }, () => new Array());
const visited = new Array(N + 1).fill(false);

for (let i = 1; i < N; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  weight[u][v] = w;
  weight[v][u] = w;
}

let max = 0;
let maxNode = 1;
function dfs(cur, w) {
  if (max < w) {
    max = w;
    maxNode = cur;
  }

  for (const next in weight[cur]) {
    if (weight[cur][next] > 0 && !visited[next]) {
      visited[next] = true;
      dfs(next, w + weight[cur][next]);
      visited[next] = false;
    }
  }
}

visited[1] = true;
dfs(1, 0);
visited[1] = false;
visited[maxNode] = true;
dfs(maxNode, 0);
visited[maxNode] = false;

console.log(max);
