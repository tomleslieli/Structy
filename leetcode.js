////////// TWO SUM   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

////////// REG EXPRESSION MATCHING   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isMatch = function (s, p) {
  let memory = new Array(s.length + 1)
    .fill(0)
    .map((e) => new Array(p.length + 1).fill(-1));
  return memorySearch(s, 0, p, 0, memory);
};

const memorySearch = (s, i, p, k, memory) => {
  if (memory[i][k] != -1) return memory[i][k];
  if (k == p.length) return i == s.length;

  let firstMatch = i < s.length && (s[i] == p[k] || p[k] == ".");
  if (k + 1 < p.length && p[k + 1] == "*") {
    memory[i][k] =
      (firstMatch && memorySearch(s, i + 1, p, k, memory)) ||
      memorySearch(s, i, p, k + 2, memory);
  } else {
    memory[i][k] = firstMatch && memorySearch(s, i + 1, p, k + 1, memory);
  }
  return memory[i][k];
};

////////// SAME TREE   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isSameTree = function (p, q) {
  if (p == null || q == null) return p === q;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

////////// MINIMUM COST   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mergeStones = function (stones, K) {
  const KMO = K - 1;
  const N = stones.length;
  if ((N - 1) % KMO !== 0) return -1;
  const sum = [0];
  const dp = stones.map((s) => stones.map((s1) => 0));
  stones.forEach((s) => {
    sum.push(sum[sum.length - 1] + s);
  });
  for (let e = KMO; e < N; e++) {
    for (let b = e - KMO; b >= 0; b--) {
      for (let split = e - 1; split >= b; split -= KMO) {
        let cost = dp[b][split] + dp[split + 1][e];
        dp[b][e] = dp[b][e] === 0 ? cost : Math.min(dp[b][e], cost);
      }
      if ((e - b) % KMO === 0) {
        dp[b][e] += sum[e + 1] - sum[b];
      }
    }
  }
  return dp[0][N - 1];
};

////////// GRID ILLUMINATION   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gridIllumination = function (N, lamps, queries) {
  const rowMap = new Map();
  const colMap = new Map();
  const hillMap = new Map();
  const daleMap = new Map();
  const litMap = new Map();
  const direction = [
    [0, 0],
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
    [-1, -1],
    [1, 1],
  ];
  //map what areas are lit
  for (let [x, y] of lamps) {
    insert(rowMap, x);
    insert(colMap, y);
    insert(hillMap, x + y);
    insert(daleMap, x - y);
    litMap.set(N * x + y, true);
  }
  const result = new Array(queries.length).fill(0);
  let count = 0;
  for (let [x, y] of queries) {
    if (
      rowMap.get(x) > 0 ||
      colMap.get(y) > 0 ||
      hillMap.get(x + y) > 0 ||
      daleMap.get(x - y) > 0
    ) {
      result[count] = 1;
    }
    for (let [i, j] of direction) {
      let newX = x + i;
      let newY = y + j;
      if (litMap.has(N * newX + newY)) {
        decrease(rowMap, newX);
        decrease(colMap, newY);
        decrease(hillMap, newX + newY);
        decrease(daleMap, N * newX + newY);
        litMap.delete(N * newX + newY);
      }
    }
    count++;
  }
  return result;
};
const insert = (map, value) => {
  if (map.has(value)) {
    map.set(value, map.get(value) + 1);
  } else {
    map.set(value, 1);
  }
};
const decrease = (map, value) => {
  if (map.has(value)) {
    map.set(value, map.get(value) - 1);
  }
};

////////// FIND COMMON CHARACTERS   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const commonChars = function (A) {
  const minArr = minEl(A);
  const res = [];
  for (let i = 0; i < minArr[1]; i++) {
    let target = A[minArr[0]][i];
    let all = true;
    for (let j = 0; j < A.length; j++) {
      if (j === minArr[0]) continue;
      if (all === false) continue;
      let idx;
      if ((idx = A[j].indexOf(target)) === -1) {
        all = false;
      } else {
        A[j] = A[j].slice(0, idx) + A[j].slice(idx + 1);
      }
    }
    if (all) res.push(target);
  }

  return res;
};

function minEl(arr) {
  const res = [0, Number.MAX_SAFE_INTEGER]; // [idx, len]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < res[1]) {
      res[0] = i;
      res[1] = arr[i].length;
    }
  }
  return res;
}

////////// COMPLEMENT OF BASE 10 INTEGER   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bitwiseComplement = function (N) {
  if (N === 0) return 1;
  let bitmask = N;
  bitmask |= bitmask >> 1;
  bitmask |= bitmask >> 2;
  bitmask |= bitmask >> 4;
  bitmask |= bitmask >> 8;
  bitmask |= bitmask >> 16;
  return bitmask ^ N;
};

////////// MAX CONSECUTIVE ONES   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const longestOnes = function (A, K) {
  let i = 0;
  let j = 0;
  const len = A.length;
  while (j < len) {
    if (A[j] === 0) K--;
    if (K < 0) {
      if (A[i] === 0) K++;
      i++;
    }
    j++;
  }
  return j - i;
};

////////// MAXIMIZE SUM OF ARRAY AFTER NEGATIONS   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const largestSumAfterKNegations = function (A, K) {
  if (A.length === 0) return 0;
  A.sort((a, b) => a - b);
  let res = 0;
  let posIdx;
  for (let i = 0, num = 0; i < A.length; i++) {
    if (num < K) {
      if (A[i] < 0) {
        A[i] = -A[i];
      } else {
        if (posIdx == null) {
          posIdx = Math.abs(A[i]) - Math.abs(A[i - 1]) > 0 ? i - 1 : i;
        }
        A[posIdx] = -A[posIdx];
      }
      num++;
    }
  }
  res = A.reduce((ac, el) => ac + el, 0);
  return res;
};

////////// CLUMSY FACTORIAL   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const clumsy = function (N) {
  const ops = ["*", "/", "+", "-"];
  const arr = [];
  arr.push(N);
  for (let i = N - 1, idx = 0; i > 0; i--, idx++) {
    let op = ops[idx % 4];
    let arrIdx = arr.length - 1 < 0 ? 0 : arr.length - 1;
    switch (op) {
      case "*":
        arr[arrIdx] *= i;
        break;
      case "/":
        arr[arrIdx] = Math.floor(arr[arrIdx] / i);
        break;
      case "+":
        arr[0] += i;
        break;
      case "-":
        arr.push(i);
        break;
    }
  }

  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res -= arr[i];
  }
  return res;
};

////////// CONSTRUCT BINARY SEARCH TREE FROM TRAVERSAL   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bstFromPreorder = function (preorder) {
  let i = 0;
  return bstFromPreorder(preorder, Number.MAX_VALUE);
  function bstFromPreorder(A, bound) {
    if (i === A.length || A[i] > bound) return null;
    let root = new TreeNode(A[i++]);
    root.left = bstFromPreorder(A, root.val);
    root.right = bstFromPreorder(A, bound);
    return root;
  }
};

////////// COMPLEMENT OF BASE 10 INTEGER  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bitwiseComplement = function (N) {
  let X = 1;
  while (N > X) X = X * 2 + 1;
  return N ^ X;
};

////////// SYMMETRIC TREE  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isSymmetric = function (root) {
  if (root == null) return true;
  return compare(root.left, root.right);
};

function compare(l, r) {
  if (l == null && r == null) return true;
  if ((l == null && r != null) || (l != null && r == null)) return false;

  if (l.val === r.val) {
    if (
      compare(l.left, r.right) !== false &&
      compare(l.right, r.left) !== false
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

////////// CAPACITY TO SHIP PACKAGES WITHIN DAYS  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const shipWithinDays = function (weights, days) {
  let l = Math.max(...weights);
  let r = weights.reduce((ac, e) => ac + e, 0);
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (valid(mid)) {
      r = mid;
    } else l = mid + 1;
  }

  return l;

  function valid(mid) {
    let res = 1,
      cur = 0;
    for (let w of weights) {
      if (cur + w > mid) {
        cur = 0;
        res++;
      }
      cur += w;
    }
    return res <= days;
  }
};

////////// COMPLEMENT OF BASE 10 INT  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bitwiseComplement = function (N) {
  let binStr = bin(N);
  let str = "";
  for (let i = 0; i < binStr.length; i++) {
    str += binStr[i] === "0" ? "1" : "0";
  }
  return parseInt(str, 2);
};

function bin(N) {
  return (N >>> 0).toString(2);
}

////////// PAIRS OF SONGS WITHTOTAL DURATION DIVIS BY 60  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const numPairsDivisibleBy60 = function (time) {
  const count = new Map();
  let n = 0;
  for (let t of time) {
    // two sum like method
    let d = (60 - (t % 60)) % 60;
    if (count.has(d)) {
      n += count.get(d);
    }
    count.set(t % 60, 1 + (count.get(t % 60) || 0));
  }
  return n;
};

////////// CAPACITY TO SHIP PACKGES WITHIN D DAYS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const shipWithinDays = function (weights, D) {
  let left = 0,
    right = 0;
  for (let w of weights) {
    left = Math.max(left, w);
    right += w;
  }
  while (left < right) {
    let mid = Math.floor((left + right) / 2),
      need = 1,
      cur = 0;
    for (let w of weights) {
      if (cur + w > mid) {
        need += 1;
        cur = 0;
      }
      cur += w;
    }
    if (need > D) left = mid + 1;
    else right = mid;
  }
  return left;
};

////////// NUMBERS WITHIN REPEATED DIGITS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const numDupDigitsAtMostN = function (N) {
  const L = [];
  for (let x = N + 1; x > 0; x = Math.floor(x / 10)) L.unshift(x % 10);

  let res = 0,
    n = L.length;
  for (let i = 1; i < n; ++i) res += 9 * A(9, i - 1);

  const seen = new Set();
  for (let i = 0; i < n; ++i) {
    for (let j = i > 0 ? 0 : 1; j < L[i]; ++j)
      if (!seen.has(j)) res += A(9 - i, n - i - 1);
    if (seen.has(L[i])) break;
    seen.add(L[i]);
  }
  return N - res;
};

function A(m, n) {
  return n === 0 ? 1 : A(m, n - 1) * (m - n + 1);
}

////////// MAXIMUM SUM OF 3 NON-OVERLAPPING SUBARRAYS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxSumOfThreeSubarrays = function (nums, k) {
  const n = nums.length;
  const sum = Array(n + 1).fill(0);
  const left = Array(n).fill(0);
  const right = Array(n).fill(n - k);
  const ans = Array(3).fill(0);
  for (let i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + nums[i];
  }
  for (let i = k, total = sum[k] - sum[0]; i < n; i++) {
    if (sum[i + 1] - sum[i + 1 - k] > total) {
      left[i] = i + 1 - k;
      total = sum[i + 1] - sum[i + 1 - k];
    } else {
      left[i] = left[i - 1];
    }
  }
  for (let i = n - 1 - k, total = sum[n] - sum[n - k]; i >= 0; i--) {
    if (sum[i + k] - sum[i] >= total) {
      right[i] = i;
      total = sum[i + k] - sum[i];
    } else {
      right[i] = right[i + 1];
    }
  }
  for (let i = k; i <= n - 2 * k; i++) {
    const l = left[i - 1];
    const r = right[i + k];
    const total =
      sum[l + k] - sum[l] + sum[r + k] - sum[r] + sum[i + k] - sum[i];
    if (total > ans[0]) {
      ans[0] = total;
      ans[1] = l;
      ans[2] = i;
    }
  }
  return ans;
};

////////// CONVERT TO BASE 2  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const baseNeg2 = function(N) {
  return negBase(N, -2)
};

function negBase(val, base) {
  if(val === 0) return '0'
	let result = '';
	while (val !== 0) {
		let remainder = val % base;
		val = Math.trunc(val / base);
		if (remainder < 0) {
			remainder += -base;
			val += 1;
		}
		result = remainder + result;
	}
	return result;
}

////////// BINARY PREFIX DIVISIBLE BY 5  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const prefixesDivBy5 = function(A) {
  const res = []
  let pre = 0
  const len = A.length
  for(let i = 0; i < len; i++) {
    pre = (pre % 100) * 2 + A[i]
    res.push(pre % 5 === 0 ? true : false)
  }
  return res
};

////////// BINARY TREE LEVEL ORDER TRAVERSAL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const levelOrder = function(root) {
  const res = [];
  if (root == null) return res;
  let next = [root];
  while (next.length > 0) {
    next = tr(res, next);
  }
  return res;
};

function tr(res, nodeArr) {
  const arr = [];
  const nextLevelNodes = [];
  for (let i = 0; i < nodeArr.length; i++) {
    arr.push(nodeArr[i].val);
    if (nodeArr[i].left) {
      nextLevelNodes.push(nodeArr[i].left);
    }
    if (nodeArr[i].right) {
      nextLevelNodes.push(nodeArr[i].right);
    }
  }
  if (arr.length) res.push(arr);
  return nextLevelNodes;
}

////////// PARTITION ARRAY INTO THREE PARTS W EQUAL SUM ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canThreePartsEqualSum = function(A) {
  let lo = 0
  let hi = A.length - 1
  let lsum = 0
  let hsum = 0
  const sum = A.reduce((ac, el) => ac + el, 0)
  if(sum % 3 !== 0) return false
  const target = sum / 3

  while(lo < hi && lsum !== target) {
    lsum += A[lo]
    lo++
  }
  if(lsum !== target) return false
  while(lo < hi && hsum !== target) {
    hsum += A[hi]
    hi--
  }
  if(hsum !== target) return false

  let msum = 0
  for(let i = lo; i <= hi; i++) {
    msum += A[i]
  }
  if(msum !== target) return false
  return true
};

////////// BEST SIGHTSEEING PAIR ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxScoreSightseeingPair = function(A) {
  let ans =A[0];
  let prevBestIdx =0;
  for(let j=1;j<A.length;j++){
      ans = Math.max(ans, A[prevBestIdx]+prevBestIdx+A[j]-j);
      if(A[prevBestIdx ]+prevBestIdx <A[j]+j){
          prevBestIdx =j;
      }
  }
  return ans;
};