const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const adj = Array.from({ length: n + 1 }, () =>
  Array.from({ length: n + 1 }, () => Infinity)
);
let index = 1;

for (let i = 0; i < k; i++) {
  const [before, next] = input[index++].split(" ").map(Number);
  adj[before][next] = 1;
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === j) {
      adj[i][j] = 0;
    }
  }
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    for (let k = 1; k <= n; k++) {
      adj[j][k] = Math.min(adj[j][k], adj[j][i] + adj[i][k]);
    }
  }
}

const T = Number(input[index++]);

for (let i = 0; i < T; i++) {
  const [before, next] = input[index++].split(" ").map(Number);
  if (adj[before][next] === Infinity) {
    if (adj[next][before] === Infinity) {
      console.log(0);
    } else {
      console.log(1);
    }
  } else {
    console.log(-1);
  }
}
