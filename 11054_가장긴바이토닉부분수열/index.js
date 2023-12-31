const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "ex.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input.shift()); // 배열 크기
const arr = input.shift().split(" ").map(Number); // 배열

const up = new Array(N).fill(1); // 가장 긴 증가하는 부분 배열
const down = new Array(N).fill(1); // 가장 긴 감소하는 부분 배열

// 가장 긴 증가하는 부분 배열 구하기
for (let i = 1; i < N; i++) {
  let length = 1;
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      // 뒤의 크기가 더 크면
      length = Math.max(length, up[j] + 1);
    }
  }
  up[i] = length; // 현재 length를 저장
}

// 가장 긴 감소하는 부분 배열 구하기
for (let i = N - 2; i >= 0; i--) {
  let length = 1;
  for (let j = i + 1; j < N; j++) {
    if (arr[i] > arr[j]) {
      // 앞의 크키가 더 크면
      length = Math.max(length, down[j] + 1);
    }
  }
  down[i] = length;
}

const DP = up.map((ele, index) => ele + down[index]); // up배열과 down배열의 index번째에 저장된 값 저장

console.log(Math.max(...DP) - 1); // DP배열중 최댓값 출력
