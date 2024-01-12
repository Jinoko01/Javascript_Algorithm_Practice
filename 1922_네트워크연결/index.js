const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

let graph = Array.from({ length: N + 1 }, () => null);
const ufa = new Array(N + 1);

for (let i = 0; i < M; i++) {
  let [u, v, w] = input[i + 2].split(" ").map(Number);
  graph[i] = [u, v, w];
}

for (let i = 1; i <= N; i++) ufa[i] = i;

graph.sort((a, b) => a[2] - b[2]);

const find = (num) => {
  if (ufa[num] === num) return num;
  else {
    ufa[num] = find(ufa[num]);
    return ufa[num];
  }
};

function union(x, y) {
  x = find(x);
  y = find(y);

  if (x !== y) ufa[x] = y;
}

function solution() {
  let sum = 0;
  let cnt = 0;
  for (let [u, v, w] of graph) {
    if (find(u) === find(v)) continue;

    sum += w;
    cnt++;

    union(u, v);

    if (cnt === N - 1) console.log(sum);
  }
}

solution();
