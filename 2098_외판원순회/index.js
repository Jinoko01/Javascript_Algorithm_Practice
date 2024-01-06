const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const map = [];
for (let i = 1; i <= N; i++) {
  map.push(input[i].split(" ").map(Number));
}

const DP = Array.from({ length: N }, () => Array(1 << N).fill(-1));

function getMinCost(node, path) {
  if (path == (1 << N) - 1) {
    return map[node][0] ? map[node][0] : Infinity;
  }
  if (DP[node][path] > -1) {
    return DP[node][path];
  }

  DP[node][path] = Infinity;
  for (let i = 0; i < N; i++) {
    if (map[node][i] == 0 || path & (1 << i)) {
      continue;
    }
    let nextPath = path | (1 << i);
    DP[node][path] = Math.min(
      DP[node][path],
      getMinCost(i, nextPath) + map[node][i]
    );
  }

  return DP[node][path];
}

console.log(getMinCost(0, 1));
