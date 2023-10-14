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

////////// REMOVE OUTERMOST PARENTHESIS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const removeOuterParentheses = function(S) {
    let onum = 0
    let oidx = 0
    let cnum = 0
    let cidx = 0
    let res = ''
    const arr = S.split('')
    for(let i = 0, len = S.length; i < len; i++) {
      if(S[i] === '(') onum++
      if(S[i] === ')') cnum++
      if(onum === cnum) {
        res += arr.slice(oidx + 1, oidx + cnum * 2 - 1).join('')
        onum = 0
        cnum = 0
        oidx = i+1
      }
    }
    return res
};

////////// SMALLEST INT DIVISIBLE BY K ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const smallestRepunitDivByK = function(K) {
    if (K % 2 === 0 || K % 5 === 0) return -1;
    let r = 0;
    for (let N = 1; N <= K; ++N) {
        r = (r * 10 + 1) % K;
        if (r == 0) return N;
    }
    return -1;
};

////////// SUM OF ROOT TO LEAF ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const sumRootToLeaf = function(root) {
  if(root == null) return 0
  const res = []
  dfs(root, 0, res)
  const mod = Math.pow(10, 9) + 7
  return res.reduce((ac, el) => (ac + el) % mod ,0)  
};

function dfs(node, val, res) {
  const mod = Math.pow(10, 9) + 7
  if(node == null) return
  val = (val * 2 + node.val) % mod
  if(node.left === null && node.right === null) {
    res.push(val)
  }
  dfs(node.left, val, res)
  dfs(node.right, val, res)
}

////////// BINARY STRING WITH SUBSTRINGS REPRESENTING 1 TO N ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const queryString = function(S, N) {
  for(let i = 1; i <= N; i++) {
    let tmp = bin(i)
    if(S.indexOf(tmp) === -1) return false
  }
  return true
};

function bin(num) {
  return (num >>> 0).toString(2)
}

////////// CAMELCASE MATCH ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const camelMatch = function(queries, pattern) {
    const res = []

    queries.forEach(el => {
      let tmp = chk(el, pattern)
      if(tmp) res.push(true)
      else res.push(false)
    })
    
    return res
};

function chk(str, p) {
  let pIdx = 0
  let sIdx = 0
  const sLen = str.length
  const pLen = p.length
  const Acode = ('A').charCodeAt(0)
  const Zcode = ('Z').charCodeAt(0)
  let pEnd = false

  for(let i = 0; i < pLen; i++) {
    let target = p.charAt(i)
    
    while(sIdx < sLen && !pEnd) {
      if(str.charCodeAt(sIdx) >= Acode && str.charCodeAt(sIdx) <= Zcode && str.charAt(sIdx) !== target) return false
      if(str.charAt(sIdx) === target) {
        if(i !== pLen - 1) {
          sIdx++
        } else {
          pEnd = true
        }
        break
      } else {
        sIdx++        
      }
    }
    if(sIdx >= sLen) return false
  }

  for(let i = sIdx + 1; pEnd && i < sLen; i++) {
    if(str.charCodeAt(i) >= Acode && str.charCodeAt(i) <= Zcode) return false
  }
  return true
}

////////// VIDEO STITCHING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const videoStitching = function (clips, T) {
  clips.sort((a, b) => a[0] - b[0])
  let res = 0
  for(let i = 0, start = 0, end = 0, len = clips.length; start < T; start = end, res++) {
    for(; i < len && clips[i][0] <= start; i++) {
      end = Math.max(end, clips[i][1])
    }
    if(start === end) return -1
  }
  return res
}

////////// DIVISOR GAME ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const divisorGame = function(N) {
  let idx = 0  
  let x
  while(x = chk(N)) {
    idx++
    N = N - x
  }
  if(idx === 0) return false
  return idx % 2 === 1 ? true : false
};

function chk(num) {
  for(let i = 1; i < num; i++) {
     if(num % i === 0) return i
  }
  return false
}

////////// MAX DIFF BETWEEN NODE AND ANCESTOR ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxAncestorDiff = function(root) {
  const arr = []
  dfs(root, [], arr)
  let res = Number.MIN_VALUE
  for(let i = 0; i < arr.length; i++) {
    let el = arr[i]
    let max = Number.MIN_VALUE
    let min = Number.MAX_VALUE 
    for(let j = 0; j < el.length; j++) {
      if(el[j] < min) min = el[j]
      if(el[j] > max) max = el[j]
    }
    if(Math.abs(max - min) > res) res = Math.abs(max - min)
  }
  return res
};

function dfs(node, arr, res) {
if(node == null) return
arr.push(node.val)
if(node.left === null && node.right === null) {
  res.push(arr.slice(0))
  return
}

dfs(node.left, arr.slice(0), res)
dfs(node.right, arr.slice(0), res)


}

////////// LONGEST ARITHMETIC SEQUENCE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const longestArithSeqLength = function(A) {
  let a = A
  let n = A.length
  if (n <= 2) return n;

  let i, j, k, d;
  let mxl = 2;
  let current;
  let last;

  for (i = 0; i < n - mxl; i++) {
    for (j = i + 1; j < n - mxl + 1; j++) {
      d = a[j] - a[i];
      last = a[j];
      current = 2;

      for (k = j + 1; k < n; k++) {
        if (a[k] - last == d) {
          current++;
          last = a[k];
        }
      }

      mxl = Math.max(mxl, current);
    }
  }

  return mxl;
};

////////// RECOVER A TREE FROM PREORDER TRAVERSAL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const recoverFromPreorder = function(S) {
  const arr = []
  let tmp = S[0]
  for(let i = 1; i < S.length; i++) {
    if(S[i] === '-') {
      if(S[i-1] === '-') {
         tmp += '-'
       } else {
         arr.push(tmp)
         tmp = '-'
       }
    } else {
      if(S[i-1] === '-') {
        arr.push(tmp)
        tmp = S[i]
      } else {
        tmp += S[i]
      }
    }
  }
  arr.push(tmp)
  const resArr = []
  helper(resArr, arr, 0)
  return resArr[0]
};


function helper(nodeArr, strArr, idx) {
  if(idx >= strArr.length) return
  if(idx > 0) {
    
    if(strArr[idx].startsWith('-')) {
      helper(nodeArr, strArr, idx + 1)
    } else {
      nodeArr[idx] = new TreeNode(+strArr[idx])
      let d = strArr[idx - 1].length

      let tIdx

      for(let i = idx - 1; ; i = i - 2) {
        if(i>= 1) {
          if(strArr[i].length < d) {
            tIdx = i+1
            break
          }
        } else {

          tIdx = 0
          break
        }
      }
      
      if(nodeArr[tIdx].left) {
        nodeArr[tIdx].right = nodeArr[idx]
      } else {
        nodeArr[tIdx].left = nodeArr[idx]
      }
      helper(nodeArr, strArr, idx + 1)
    }

  } else {
    nodeArr[idx] = new TreeNode(+strArr[idx])
    helper(nodeArr, strArr, idx + 1)
  }
  
}

////////// TWO CITY SCHEDULING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const twoCitySchedCost = function(costs) {
  const N = costs.length
  let res = 0
  const refund = []
  for(let i = 0; i < N; i++) {
    refund[i] = costs[i][1] - costs[i][0]
    res += costs[i][0]
  }
  refund.sort((a, b) => a - b)
  for(let i = 0; i < N / 2; i++) {
    res += refund[i]
  }
  return res
};

////////// BINARY TREE ZIGZAG LEVEL ORDER TRAVERSAL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const zigzagLevelOrder = function(root) {
  if(root == null) return []
  const row = [root]
  const res = []
  bfs(row, res)
  for(let i = 0; i < res.length; i++) {
    res[i] = i % 2 === 0 ? res[i] : res[i].reverse()
  }
  return res
};

function bfs(row, res) {
  if(row.length === 0) return
  let tmp = []
  let next = []
  for(let i = 0; i< row.length; i++) {
    tmp.push(row[i].val)
    if(row[i].left) {
       next.push(row[i].left)
    }
    if(row[i].right) {
       next.push(row[i].right)
    }
  }
  if(tmp.length) {
    res.push(tmp)
  }
  bfs(next, res)
}

////////// MATRIX CELLS IN DISTANCE ORDER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const allCellsDistOrder = function(R, C, r0, c0) {
  const matrix = Array.from({ length: R }, () => new Array(C))
  const arr = []
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      arr.push([i, j])
    }
  }

  return arr.sort(
    (a, b) =>
      Math.abs(a[0] - r0) +
      Math.abs(a[1] - c0) -
      (Math.abs(b[0] - r0) + Math.abs(b[1] - c0))
  )
}

////////// NEXT GREATER NODE IN LINKED LIST ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const nextLargerNodes = function(head) {
  const A = []
  while (head != null) A.push(head.val), (head = head.next)
  const res = new Array(A.length).fill(0)
  const stack = []
  for (let i = 0; i < A.length; i++) {
    while (stack.length && A[stack[stack.length - 1]] < A[i])
      res[stack.pop()] = A[i]
    stack.push(i)
  }
  return res
}

////////// MAXIMUM SUM OF TWO NON OVERLAPPING SUBARRAYS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxSumTwoNoOverlap = function(A, L, M) {
  let n = A.length
  let sum = []
  sum[0] = 0
  for (let i = 0; i < n; i++) sum[i + 1] = sum[i] + A[i]

  let ans = 0
  for (let i = L - 1; i + M < n; ++i) {
    for (let j = i + 1; j + M - 1 < n; ++j) {
      ans = Math.max(ans, sum[i + 1] - sum[i - L + 1] + sum[j + M] - sum[j])
    }
  }
  let tmp = L
  L = M
  M = tmp
  for (let i = L - 1; i + M < n; ++i) {
    for (let j = i + 1; j + M - 1 < n; ++j) {
      ans = Math.max(ans, sum[i + 1] - sum[i - L + 1] + sum[j + M] - sum[j])
    }
  }
  return ans
}

////////// NUMBER OF ENCLAVES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const numEnclaves = function(A) {
  let res = 0
  const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]]
  const visited = Array.from({ length: A.length }, () =>
    new Array(A[0].length).fill(false)
  )
  for (let row = 0; row < A.length; row++) {
    for (let col = 0; A[0] && col < A[0].length; col++) {
      if (
        (row === 0 ||
          col === 0 ||
          row === A.length - 1 ||
          col === A[0].length - 1) &&
        A[row][col] === 1
      ) {
        dfs(A, row, col, visited, dirs)
      }
    }
  }
  for (let row = 0; row < A.length; row++) {
    for (let col = 0; A[0] && col < A[0].length; col++) {
      if (A[row][col] === 1) {
        res += 1
      }
    }
  }
  return res
}

function dfs(A, row, col, v, dirs) {
  if (
    row < 0 ||
    row >= A.length ||
    col < 0 ||
    col >= A[0].length ||
    v[row][col] ||
    A[row][col] === 0
  )
    return

  v[row][col] = true
  A[row][col] = 0

  for (let dir of dirs) {
    dfs(A, row + dir[0], col + dir[1], v, dirs)
  }
}

////////// STREAM OF CHARACTERS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

StreamChecker.prototype.query = function(letter) {
  this.s[++this.pos] = letter
  return this.find(this.s, this.pos, Math.min(this.pos + 1, this.maxLen))
}

StreamChecker.prototype.add = function(word) {
  let len = word.length
  let p = this.root
  for (let i = len - 1; i >= 0; i--) {
    let k = word.charCodeAt(i) - 'a'.charCodeAt(0)
    if (p.child[k] == null) p.child[k] = new Node()
    p = p.child[k]
  }
  p.valid = true
}

StreamChecker.prototype.find = function(s, pos, len) {
  let p = this.root
  for (let i = 0; i < len; i++) {
    let k = s[pos - i].charCodeAt(0) - 'a'.charCodeAt(0)
    if (p.child[k] == null) return false
    p = p.child[k]
    if (p.valid) return true
  }
  return false
}
class Node {
  constructor() {
    this.child = []
    this.valid = false
  }
}

////////// MOVING STONES UNTIL CONSECUTIVE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const numMovesStones = function(a, b, c) {
  let min = 0
  let min2 = 0
  let max = 0
  const arr= [a,b,c]
  arr.sort((a,b) => a - b)
  
  max = arr[2]-arr[1]-1 + arr[1] - arr[0] - 1
  min = (arr[2] - arr[1] > 1 ? 1 : 0) +(arr[1] - arr[0] > 1 ? 1 : 0)
  min2 = arr[2] - arr[1] === 2 || arr[1] - arr[0] === 2 ? 1 : Number.MAX_VALUE

  return [Math.min(min, min2), max]
};

////////// COLOR BORDER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const colorBorder = function(grid, r0, c0, color) {
  const dirs = [[-1,0], [1,0], [0,1], [0,-1]]
  const c = grid[r0][c0]
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array.from({length: rows}, () => new Array(cols).fill(0))
  dfs(r0, c0, c, rows, cols, visited, grid, dirs)
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(visited[i][j] === -1) {
         if(i === 0 || j === 0 || i === rows - 1 || j === cols - 1) {
            visited[i][j] = -2
         } else {
            for(let dir of dirs) {
              if(visited[i + dir[0]][j + dir[1]] === 0) {
                 visited[i][j] = -2
                 break
              }
            }    
         }
      }
    }
  }
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(visited[i][j] === -2) grid[i][j] = color
    }
  }
  
  return grid
};

function dfs(row, col, target, rows, cols, visited, grid, dirs) {
  if(row >= rows || col >= cols || row < 0 || col < 0 || grid[row][col] !== target || visited[row][col] === -1) {
    return   
  }
  visited[row][col] = -1
  for(let dir of dirs) {
    dfs(row + dir[0], col+dir[1], target, rows, cols, visited, grid, dirs)
  }
  
}

////////// UNCROSSED LINES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxUncrossedLines = function(A, B) {
  const m = A.length,
    n = B.length
  const dp = new Array(n + 1).fill(0)
  let prev

  for (let i = 1; i <= m; i++) {
    prev = dp[0]
    for (let j = 1; j <= n; j++) {
      let backup = dp[j]
      if (A[i - 1] == B[j - 1]) dp[j] = prev + 1
      else dp[j] = Math.max(dp[j], dp[j - 1])
      prev = backup
    }
  }

  return dp[n]
}

////////// ESCAPE LARGE MAZE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isEscapePossible = function(blocked, source, target) {
  const blockedSet = new Set()
  for (let el of blocked) {
    let key = el[0] + "," + el[1]
    blockedSet.add(key)
  }
  return canVisit(blockedSet, source, target) && canVisit(blockedSet, target, source)
}

function canVisit(blocked, start, end) {
  const visited = new Set()
  return dfs(blocked, start[0], start[1], end[0], end[1], visited)
}
function dfs(blocked, i, j, m, n, visited) {
  visited.add(i + "," + j)
  const dirs = [[i - 1, j], [i + 1, j], [i, j + 1], [i, j - 1]]
  if ((i == m && j == n) || visited.size >= 20000) {
    return true
  }
  for (let dir of dirs) {
    let nextKey = dir[0] + "," + dir[1]
    if (
      dir[0] >= 0 &&
      dir[1] >= 0 &&
      dir[0] < 1e6 &&
      dir[1] < 1e6 &&
      !blocked.has(nextKey) &&
      !visited.has(nextKey)
    ) {
      if (dfs(blocked, dir[0], dir[1], m, n, visited)) {
        return true
      }
    }
  }
  return false
}

////////// VALID BOOMERANG ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isBoomerang = function(points) {
  if(angle(points[0], points[1], points[2]) &&
     angle(points[1], points[2], points[0]) &&
     angle(points[1], points[0], points[2]) ) return false
  return true
};

function angle(p1, p2, p3) {
  if((p1[0] === p2[0] && p1[1] === p2[1]) ||
     (p2[0] === p3[0] && p2[1] === p3[1]) ||
     (p1[0] === p3[0] && p1[1] === p3[1]) ) return true
  
  return collinear(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1])
}
function collinear(x1, y1, x2, y2,  x3, y3)  { 
  return (y3 - y2) * (x2 - x1) === (y2 - y1) * (x3 - x2)
} 

////////// BNS TO GREATER SUM TREE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bstToGst = function(root) {
  const arr = []
  dfs(root, arr)
  let v = 0
  for(let i = arr.length - 1; i >= 0; i--) {
    arr[i].val = arr[i].val + v
    v = arr[i].val
  }
  return root
};

function dfs(node, arr) {
  if(node == null) return
  dfs(node.left, arr)
  arr.push(node)
  dfs(node.right, arr)
}

////////// MIN SCORE TRIANGULATION OF POLYGON ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minScoreTriangulation = function(A) {
  if(A.length <= 2) return 0
  if(A.length === 3) return A[0] * A[1] * A[2]
  return chk(A, A.length)
};

function cost(points, i, j, k) {
  let p1 = points[i],
    p2 = points[j],
    p3 = points[k]
  return p1 * p2 * p3
}

function chk(points, n) {
  if (n < 3) return 0

  const table = Array.from({ length: n }, () => new Array(n).fill(0))

  for (let gap = 0; gap < n; gap++) {
    for (let i = 0, j = gap; j < n; i++, j++) {
      if (j < i + 2) table[i][j] = 0
      else {
        table[i][j] = Number.MAX_VALUE
        for (let k = i + 1; k < j; k++) {
          let val = table[i][k] + table[k][j] + cost(points, i, j, k)
          if (table[i][j] > val) table[i][j] = val
        }
      }
    }
  }
  return table[0][n - 1]
}

////////// MAX DEPTH OF BINARY TREE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxDepth = function(root) {
  if (!root) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  let depth = left > right ? left : right;
  return (depth += 1);
};

////////// MOVING STONES II ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const numMovesStonesII = function(stones) {
stones.sort((a, b) => a - b)
let n = stones.length;
let least = Number.MAX_VALUE, most = Number.MIN_VALUE;

for (let i = 0, j = 0; i < n; i++) {
  while (j + 1 < n && stones[j + 1] - stones[i] < n) j++;
  let now = n - (j - i + 1);
  if (j - i == n - 2 && stones[j] - stones[i] == j - i) now++;
  least = Math.min(least, now);
}

most = Math.max(stones[n - 1] - stones[1], stones[n - 2] - stones[0]) - (n - 2);
return [least, most];
};

////////// NO ADJACENT FLOWER PLANTING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gardenNoAdj = function(N, paths) {
  const map = {};
  for (let i = 0; i < N; i++) {
    map[i] = [];
  }
  for (let path of paths) {
    let l = path[0] - 1;
    let r = path[1] - 1;
    map[l].push(r);
    map[r].push(l);
  }
  const result = new Array(N).fill(-1);
  for (let i = 0; i < N; i++) {
    let colors = new Array(4).fill(false);
    for (let neighbor of map[i]) {
      if (result[neighbor] !== -1) {
        colors[result[neighbor]] = true;
      }
    }
    for (let j = 0; j < colors.length; j++) {
      if (!colors[j]) {
        result[i] = j;
        break;
      }
    }
  }
  return result.map(i => ++i);
};

////////// ROBOT BOUNDED IN CIRCLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isRobotBounded = function(instructions) {
  let x = 0, y = 0, i = 0, d = [[0, 1], [1, 0], [0, -1], [ -1, 0]];
  for (let j = 0; j < instructions.length; ++j)
    if (instructions.charAt(j) === 'R') i = (i + 1) % 4;
    else if (instructions .charAt(j) === 'L') i = (i + 3) % 4;
    else {
        x += d[i][0]; y += d[i][1];
    }
  return x == 0 && y == 0 || i > 0;
};

////////// VALID BOOMERANG ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isBoomerang = function(points) {
  if(angle(points[0], points[1], points[2]) &&
     angle(points[1], points[2], points[0]) &&
     angle(points[1], points[0], points[2]) ) return false
  return true
};

function angle(p1, p2, p3) {
  if((p1[0] === p2[0] && p1[1] === p2[1]) ||
     (p2[0] === p3[0] && p2[1] === p3[1]) ||
     (p1[0] === p3[0] && p1[1] === p3[1]) ) return true
  
  return collinear(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1])
}
function collinear(x1, y1, x2, y2,  x3, y3)  { 
  return (y3 - y2) * (x2 - x1) === (y2 - y1) * (x3 - x2)

////////// B-SEARCH TREE TO GREATER SUM TREE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bstToGst = function(root) {
  const arr = []
  dfs(root, arr)
  let v = 0
  for(let i = arr.length - 1; i >= 0; i--) {
    arr[i].val = arr[i].val + v
    v = arr[i].val
  }
  return root
};

function dfs(node, arr) {
  if(node == null) return
  dfs(node.left, arr)
  arr.push(node)
  dfs(node.right, arr)
}

////////// MIN SCORE TRIANGULATION OF POLYGON ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minScoreTriangulation = function(A) {
  if(A.length <= 2) return 0
  if(A.length === 3) return A[0] * A[1] * A[2]
  return chk(A, A.length)
};

function cost(points, i, j, k) {
  let p1 = points[i],
    p2 = points[j],
    p3 = points[k]
  return p1 * p2 * p3
}

function chk(points, n) {
  if (n < 3) return 0

  const table = Array.from({ length: n }, () => new Array(n).fill(0))

  for (let gap = 0; gap < n; gap++) {
    for (let i = 0, j = gap; j < n; i++, j++) {
      if (j < i + 2) table[i][j] = 0
      else {
        table[i][j] = Number.MAX_VALUE
        for (let k = i + 1; k < j; k++) {
          let val = table[i][k] + table[k][j] + cost(points, i, j, k)
          if (table[i][j] > val) table[i][j] = val
        }
      }
    }
  }
  return table[0][n - 1]
}

////////// SELLERS WITH NO SALES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SELECT DISTINCT seller_name
FROM seller s
WHERE seller_id NOT IN (
    SELECT DISTINCT seller_id 
    FROM orders
    WHERE YEAR(sale_date) = 2020
)
ORDER BY 1;

////////// SPECIAL ARRAY WITH X ELEMENTS GREATER THAN OR EQUAL TO X ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const specialArray = function (nums) {
  nums.sort((a, b) => b - a)
  let i = 0
  while(i < nums.length && nums[i] >= i) {
    i++
  }
  if(nums[i - 1] < i) return -1
  return i
};

////////// EVEN ODD TREE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isEvenOddTree = function(root) {
  const q = [root]
  const v = []
  let l = 0
  while(q.length) {
    const size = q.length
    const row = []
    for(let i = 0; i < size; i++) {
      const cur = q.shift()
      row.push(cur.val)
      if(l % 2 === 0 && cur.val % 2 === 0) return false
      if(l % 2 === 1 && cur.val % 2 === 1) return false
      if(row.length > 1) {
        if(l % 2 === 0 && row[row.length - 1] <= row[row.length - 2]) return false
        if(l % 2 === 1 && row[row.length - 1] >= row[row.length - 2]) return false
      }
      if(cur.left) q.push(cur.left)
      if(cur.right) q.push(cur.right)
    }
    l++
  }
  return true
};

////////// SEQUENTIAL DIGITS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const sequentialDigits = function(low, high) {
  const res = []
  
  let q = []
  for(let i = 1; i <= 9; i++) q.push(i)
  
  while(q.length) {
    const tmp = []
    const size = q.length
    for(let i = 0; i < size; i++) {
      const cur = q[i]
      if(cur >= low && cur <= high) {
        res.push(cur)
      }
      if(cur > high) break
      const last = cur % 10
      if(last === 9) continue
      tmp.push(cur * 10 + last + 1)
    }
    
    q = tmp
  }
  
  return res
};

////////// MAX SIDE LENGTH OF A SQUARE WITH SUM LESS THAN OR EQUAL TO THRESHOLD ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxSideLength = function (mat, threshold) {
  let m = mat.length
  let n = mat[0].length
  const sum = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  let res = 0
  let len = 1 // square side length

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      sum[i][j] =
        sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + mat[i - 1][j - 1]

      if (
        i >= len &&
        j >= len &&
        sum[i][j] - sum[i - len][j] - sum[i][j - len] + sum[i - len][j - len] <=
          threshold
      )
        res = len++
    }
  }

  return res
}

////////// SHORTEST PATH IN A GRID WITH OBSTACLES ELIMINATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const shortestPath = function (grid, k) {
  const m = grid.length
  const n = m && grid[0].length
  if (m === 1 && n === 1) return 0
  const queue = [[0, 0, k]]
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  const visited = new Set()
  let steps = 0
  while (queue.length > 0) {
    let size = queue.length
    while (size--) {
      const [row, col, em] = queue.shift()
      if (visited.has(row + "#" + col + "#" + em)) continue
      visited.add(row + "#" + col + "#" + em)
      for (let dir of dirs) {
        const nx = row + dir[0]
        const ny = col + dir[1]
        if (
          nx < 0 ||
          nx >= m ||
          ny < 0 ||
          ny >= n ||
          visited.has(nx + "#" + ny + "#" + em)
        )
          continue
        if (nx === m - 1 && ny === n - 1) return steps + 1
        if (grid[nx][ny] === 1) {
          if (em > 0) queue.push([nx, ny, em - 1])
        } else {
          queue.push([nx, ny, em])
        }
      }
    }
    steps++
  }
  return -1
}

////////// MAP OF HIGHEST PEAK ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const highestPeak = function(isWater) {
  let q = []
  const visited = new Set()
  const m = isWater.length, n = isWater[0].length
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(isWater[i][j] === 1) {
          q.push([i, j, 0])
          visited.add(`${i},${j}`)
      }
    }
  }
  const res = Array.from({ length: m }, () => Array(n).fill(0))
  const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]]
  
  while(q.length) {
    const size = q.length
    const next = []
    // Array.shift time complexity: O(n)
    for(let i = 0; i < size; i++) {
      const cur = q[i]
      const [row, col, val] = cur
      for(let dir of dirs) {
        const newRow = row + dir[0], newCol = col + dir[1]
        const key = `${newRow},${newCol}`
        if(newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || visited.has(key) || res[newRow][newCol] !== 0) continue
        next.push([newRow, newCol, val + 1])
        res[newRow][newCol] = val + 1
        visited.add(key)
      }
    }
    q = next

  }
  return res
};

////////// COPRIME TREE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getCoprimes = function (nums, edges) {
  const output = Array(nums.length).fill(null)
  const graph = new Map()
  for (let [u, v] of edges) {
    if (!graph.has(u)) graph.set(u, [])
    if (!graph.has(v)) graph.set(v, [])
    graph.get(u).push(v)
    graph.get(v).push(u)
  }

  function getGCD(a, b) {
    if (!b) return a
    return getGCD(b, a % b)
  }

  function dfs(i, ancestors, indices) {
    for (let num of ancestors) {
      const gcd = getGCD(nums[i], num)
      if (gcd === 1) {
        output[i] = indices[num]
        break
      }
    }

    if (output[i] === null) output[i] = -1
    ancestors = [nums[i], ...ancestors.filter((x) => x !== nums[i])]
    indices[nums[i]] = i
    for (let next of graph.get(i)) {
      if (output[next] === null) {
        dfs(next, ancestors, [...indices])
      }
    }
  }

  dfs(0, [], Array(51))
  return output
}


////////// MERGE STRINGS ALTERNATELY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mergeAlternately = function(word1, word2) {
  let res = '', mark = 0, i = 0, j = 0
  while(i < word1.length && j < word2.length) {
    if(mark === 0) {
      res += word1[i++]
      mark = 1
    } else {
      res += word2[j++]
      mark = 0
    }
  }
  while(i < word1.length) res += word1[i++]
  while(j < word2.length) res += word2[j++]
  
  return res
};

////////// MINIMUM NUMBER OF OPERATIONS TO MOVE ALL BALLS TO EACH BOX ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minOperations = function(boxes) {
  const res = []
  for(let i = 0, len = boxes.length; i < len; i++) {
    res[i] = helper(boxes, i)
  }

  return res
};

function helper(str, idx) {
  let res = 0
  for(let i = 0, len = str.length; i < len; i++) {
    if(i === idx || str[i] === '0') continue
    res += Math.abs(i - idx)
  }
  return res
}

////////// NTH HIGHEST SALARY IN SQL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  RETURN (
      # Write your MySQL query statement below.
      select distinct e1.salary from Employee e1 where N-1 = (select count(distinct e2.Salary) from Employee e2 where e1.Salary < e2.Salary)
  );
END

////////// MAX SCORE FROM PERFORMING MULTIPLICATION OPERATIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maximumScore = function(nums, multipliers) {
  const n = nums.length, m = multipliers.length
  const { max } = Math
  const dp = Array.from({ length: m + 1 }, () => Array(m + 1).fill(-Infinity))
  return helper(0, 0)
  function helper(l, i) {
    if(i === m) return 0
    if(dp[l][i] !== -Infinity) return dp[l][i]
    const pickLeft = helper(l + 1, i + 1) + nums[l] * multipliers[i]
    const pickRight = helper(l, i + 1) + nums[n - (i - l) - 1] * multipliers[i]
    return dp[l][i] = max(pickLeft, pickRight)
  }

};


////////// MAXIMIZE PALINDROME LENGTH FROM SUBSEQUENCES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const longestPalindrome = function(word1, word2) {
  const str = word1 + word2
  const len = str.length, m = word1.length, n = word2.length
  const dp = LPS(str)
  let res = 0
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(word1[i] !== word2[j]) continue
      res = Math.max(res, 2 + dp[i + 1][j + m - 1])
    }
  }
  return res
}

function LPS(str) {
  const n = str.length
  const dp = Array.from({ length: n }, () => Array(n).fill(0))
  for(let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1
    for(let j = i + 1; j < n; j++) {
      if(str[i] === str[j]) dp[i][j] = 2 + dp[i + 1][j - 1]
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
    }
  }
  return dp
}

////////// COUNT ITEMS MATCHING A RULE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countMatches = function(items, ruleKey, ruleValue) {
  let res = 0
  for(let e of items) {
    if(helper(e, ruleKey, ruleValue)) res++
  }
  return res
};

function helper(e, k, v) {
  const [t, c, n] = e
  if(k === 'type' && v === t) {
    return true
  } else if(k === 'color' && v === c) {
    return true
  } else if(k === 'name' && v === n) {
    return true
  }
  
  return false
  
}

////////// CLOSEST DESSERT COST ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const closestCost = function(baseCosts, toppingCosts, target) {
  let res = baseCosts[0], n = baseCosts.length, m = toppingCosts.length
  const { abs } = Math
  for (let i = 0; i < n; i++) {
    helper(0, baseCosts[i])
  }
  return res
  function helper(i, cur) {
    if(
      abs(cur - target) < abs(res - target)
      || (abs(cur - target) === abs(res - target) && cur < res)
    ) {
      res = cur
    }
    if(i === m || cur > target) return
    helper(i + 1, cur)
    helper(i + 1, cur + toppingCosts[i])
    helper(i + 1, cur + toppingCosts[i] * 2)
  }
};

////////// EQUAL SUM ARRAYS WITH MIN NUMBER OF OPERATIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minOperations = function(nums1, nums2) {
  const m = nums1.length, n = nums2.length
  if(m > n * 6 || n > m * 6) return -1
  const sum1 = nums1.reduce((ac, e) => ac + e, 0)
  const sum2 = nums2.reduce((ac, e) => ac + e, 0)
  let largerArr, smallerArr
  if(sum1 === sum2) return 0
  if(sum1 > sum2) {
    largerArr = nums1
    smallerArr = nums2
  } else {
    largerArr = nums2
    smallerArr = nums1
  }
  
  const gain = []
  for(let e of largerArr) gain.push(e - 1)
  for(let e of smallerArr) gain.push(6 - e)
  gain.sort((a, b) => b - a)
  let diff = Math.abs(sum2 - sum1)
  let cnt = 0
  for(let e of gain) {
    diff -= e
    cnt++
    if(diff <= 0) return cnt
  }
  return -1
};

////////// CAR FLEET ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getCollisionTimes = function(cars) {
  const n = cars.length;
  const stack = [];
  const res = Array(n)
  for(let i = n - 1; i >= 0; i--) {
    const [p, s] = cars[i]
    res[i] = -1
    while(stack.length) {
      const j = stack[stack.length - 1]
      const [p2, s2] = cars[j]
      if(s2 >= s || res[j] > 0 && (p2 - p) / (s - s2) >= res[j]) stack.pop()
      else break
    }
    if(stack.length) {
      const j = stack[stack.length - 1]
      const [p2, s2] = cars[j]
      res[i] = (p2 - p) / (s - s2)
    }
    stack.push(i)
  }
  
  return res
};

////////// FIND NEAREST POINT THAT HAS SAME X OR Y COORDINATES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const nearestValidPoint = function(x, y, points) {
  let idx = -1, dis = Infinity
  const {min, max, abs} = Math
  for(let i = 0; i < points.length; i++) {
    const e = points[i]
    const [tx, ty] = e
    if(tx === x || ty === y) {
      const tmp = abs(tx - x) + abs(ty - y)
      if(tmp < dis) {
        idx = i
        dis = tmp
      }
    }
  }
  
  return idx === -1 ? -1 : idx
};

////////// LONGEST HAPPY PREFIX ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const longestPrefix = function(s) {
  return s.slice(0, dfa().pop())
  function dfa() {
    let i = 1
    let j = 0
    const len = s.length
    const prefix = Array(len + 1).fill(0)
    prefix[0] = -1
    prefix[1] = 0
    while(i < len) {
      if(s[j] === s[i]) {
        j++
        i++
        prefix[i] = j
      } else {
        if(j > 0) j = prefix[j]
        else i++
      }
    }
    return prefix
  }  
};

////////// CAPITAL GAIN LOSS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SELECT stock_name, SUM(
  CASE
      WHEN operation = 'Buy' THEN -price
      ELSE price
  END
) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name

////////// FIND LUCKY INTEGER IN AN ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findLucky = function(arr) {
  const hash = {}
  for(let e of arr) hash[e] = (hash[e] || 0) + 1
  let res
  Object.keys(hash).forEach(k => {
    if(+k === hash[k]) {
      if (res == null) res = hash[k]
      else {
        if (hash[k] > res) res = hash[k]
      }
    } 
  })
  return res == null ? -1 : res
};

////////// COUNT NUMBER OF TEAMS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const numTeams = function(rating) {
  if(rating.length < 3) return 0
  const n = rating.length
  const leftTree = Array(1e5 + 1).fill(0)
  const rightTree = Array(1e5 + 1).fill(0)
  for(let r of rating) update(rightTree, r, 1)
  let res = 0
  for(let r of rating) {
    update(rightTree, r,  -1)
    res += getPrefixSum(leftTree, r - 1) * getSuffixSum(rightTree, r + 1)
    res += getSuffixSum(leftTree, r + 1) * getPrefixSum(rightTree, r - 1)
    update(leftTree, r, 1)
  }

  return res
};

function update(bit, index, val) {
  while(index < bit.length) {
    bit[index] += val
    index += index & (-index)
  }
}

function getPrefixSum(bit, index) {
  let res = 0
  while(index > 0) {
    res += bit[index]
    index -= index & (-index)
  }
  return res
}

function  getSuffixSum(bit, index) {
  return getPrefixSum(bit, 1e5) - getPrefixSum(bit, index - 1)
}

////////// LRU CACHE  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Node {
  constructor(key, val) {
    this.val = val;
    this.key = key;
    this.next = this.pre = null;
  }
}

const LRUCache = function(capacity) {
  this.capacity = capacity;
  this.count = 0;
  this.start = new Node(-1, -1);
  this.end = new Node(-1, -1);
  this.start.next = this.end;
  this.end.pre = this.start;
  this.map = {};
};

// insert node into the next of the start
const insertAfter = function(start, node) {
  let next = start.next;
  start.next = node;
  node.pre = start;
  node.next = next;
  next.pre = node;
};

const detach = function(node) {
  let pre = node.pre,
    next = node.next;
  pre.next = next;
  next.pre = pre;
  node.next = node.pre = null;
};

LRUCache.prototype.get = function(key) {
  let node = this.map[key];
  if (node != undefined) {
    detach(node);
    insertAfter(this.start, node);
    return node.val;
  } else {
    return -1;
  }
};


LRUCache.prototype.put = function(key, value) {
  let node = this.map[key];
  if (!node) {
    if (this.count == this.capacity) {
      let t = this.end.pre;
      detach(t);
      delete this.map[t.key];
    } else {
      this.count++;
    }
    node = new Node(key, value);
    this.map[key] = node;
    insertAfter(this.start, node);
  } else {
    node.val = value;
    detach(node);
    insertAfter(this.start, node);
  }
};

////////// MAKE TWO ARRAYS EQUAL BY REVERSING SUB ARRAYS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canBeEqual = function(target, arr) {
  if(target.length !== arr.length) return false
  const tHash = {}, aHash = {}
  for(let i = 0, len = arr.length; i < len;i++) {
    const t = target[i], a = arr[i]
    if(tHash[t] == null) tHash[t] = 0
    if(aHash[a] == null) aHash[a] = 0
    tHash[t]++
    aHash[a]++
  }
  
  const keys = Object.keys(tHash)
  for(let k of keys) {
    if(tHash[k] !== aHash[k]) return false 
  }
  
  return true
};


////////// CHECK IF A STRING CONTAINS ALL BINARY CODES OF SIZE K ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const hasAllCodes = function (s, k) {
  if (s.length < k) return false
  const set = new Set()
  for (let i = 0; i <= s.length - k; i++) {
    set.add(s.slice(i, i + k))
  }

  return set.size == Math.pow(2, k)
}

////////// COURSE SCHEDULE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkIfPrerequisite = function (numCourses, prerequisites, queries) {
  const n = numCourses, m = prerequisites.length
  const graph = {}, inDegree = Array(n).fill(0)
  
  for(const [s, e] of prerequisites) {
    if(graph[s] == null) graph[s] = []
    inDegree[e]++
    graph[s].push(e)
  }
  
  let q = []
  
  for(let i = 0; i < n; i++) {
    if(inDegree[i] === 0) q.push(i)
  }
  
  const hash = {}

  while(q.length) {
    const size = q.length
    const nxt = []
    for(let i = 0; i < size; i++) {
      const cur = q[i]
      for(const e of (graph[cur] || [])) {
        inDegree[e]--
        if(hash[e] == null) hash[e] = new Set()
        hash[e].add(cur)
        for(const dep of (hash[cur] || [])) {
          hash[e].add(dep)
        }
      
        if(inDegree[e] === 0) {
          nxt.push(e)
        }
      }
    }
    
    q = nxt
  }
  
  const res = []
  for(const [p, e] of queries) {
    if(hash[e] && hash[e].has(p)) res.push(true)
    else res.push(false)
  }
  
  return res
}

//////////  FINAL PRICES WITH A SPECIAL DISCOUNT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const finalPrices = function(prices) {
  const res = [], n = prices.length
  for(let i = 0; i < n; i++) {
    const cur = prices[i]
    let dis = null
    for(let j = i + 1; j < n; j++) {
      if(prices[j] <= cur) {
        dis = prices[j]
        break
      }
    }
    res.push(dis == null ? cur : cur - dis)
  }
  return res
};

//////////  SUBRECTANGLE QUERIES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SubrectangleQueries = function(rectangle) {
  this.rect = rectangle
  this.ops = []
};

SubrectangleQueries.prototype.updateSubrectangle = function(row1, col1, row2, col2, newValue) {
  this.ops.push([row1, col1, row2, col2, newValue])
};

SubrectangleQueries.prototype.getValue = function(row, col) {
  for(let i = this.ops.length - 1; i >= 0; i--) {
    const op = this.ops[i]
    if(op[0] <= row && op[1] <= col && row <= op[2] && col <= op[3]) return op[4]
  }
  return this.rect[row][col]
};


//////////  ALLOCATE MAILBOXES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minDistance = function (A, K) {
  A.sort((a, b) => a - b)
  let n = A.length,
    B = new Array(n + 1).fill(0),
    dp = Array(n).fill(0)
  for (let i = 0; i < n; ++i) {
    B[i + 1] = B[i] + A[i]
    dp[i] = 1e6
  }
  for (let k = 1; k <= K; ++k) {
    for (let j = n - 1; j > k - 2; --j) {
      for (let i = k - 2; i < j; ++i) {
        let m1 = ((i + j + 1) / 2) >> 0,
          m2 = ((i + j + 2) / 2) >> 0
        let last = B[j + 1] - B[m2] - (B[m1 + 1] - B[i + 1])
        dp[j] = Math.min(dp[j], (i >= 0 ? dp[i] : 0) + last)
      }
    }
  }
  return dp[n - 1]
}

//////////  SALES BY DAY OFTHE WEEK SQL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SELECT i.item_category AS Category,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 2 THEN quantity ELSE 0 END) AS Monday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 3 THEN quantity ELSE 0 END) AS Tuesday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 4 THEN quantity ELSE 0 END) AS Wednesday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 5 THEN quantity ELSE 0 END) AS Thursday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 6 THEN quantity ELSE 0 END) AS Friday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 7 THEN quantity ELSE 0 END) AS Saturday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 1 THEN quantity ELSE 0 END) AS Sunday
FROM Items i
LEFT JOIN Orders o
ON i.item_id = o.item_id
GROUP BY i.item_category
ORDER BY i.item_category;

////////// SORT LIST ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sortList(head) {
  quickSort(head, null);
  return head;
}

function quickSort(head, tail) {
  if (head == tail) {
    return;
  }
  const slow = partition(head, tail);
  quickSort(head, slow);
  quickSort(slow.next, tail);
}

function swap(node1, node2) {
  let tmp = node1.val;
  node1.val = node2.val;
  node2.val = tmp;
}

function partition(head, tail) {
  let slow = head,
    fast = head.next;
  let p = head.val;
  while (fast != tail) {
    if (fast.val <= p) {
      slow = slow.next;
      swap(slow, fast);
    }
    fast = fast.next;
  }
  swap(head, slow);
  return slow;
}

//////////  RUNNING SUM ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const runningSum = function(nums) {
  for(let i = 1, len = nums.length; i < len; i++) {
    nums[i] += nums[i - 1]
  }
  return nums
};

//////////  LEAST NUMBER OFUNIQUE INTEGERS AFTER K REMOVALS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findLeastNumOfUniqueInts = function (arr, k) {
  const map = {}

  for (const num of arr) {
    map[num] = map[num] || 0
    map[num] += 1
  }
  const keys = Object.keys(map).sort((a, b) => map[a] - map[b])
  for (const key of keys) {
    while (map[key] > 0 && k > 0) {
      k--
      map[key] -= 1
      if (map[key] === 0) {
        delete map[key]
      }
    }
  }
  return Object.keys(map).length
}

//////////  MINIMUM NUMBER OF DAYS TO AMKE AM BOUQUETS  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minDays = function(bloomDay, m, k) {
  const n = bloomDay.length
  let l = -1, r = Math.max(...bloomDay)
  while(l < r) {
    const mid = l + Math.floor((r - l) / 2)
    if(valid(mid)) r = mid
    else l = mid + 1
  }
  return valid(l) ? l : -1

  function valid(mid) {
    let res = 0, cur = 0
    for (let i = 0; i < n; i++) {
      const e = bloomDay[i]
      if(e <= mid) {
        cur++
        if(cur >= k) {
          res++
          cur = 0
        }
      } else {
        cur = 0
      }
    }
    return res >= m
  }
};

//////////  KTH ANCESTOR OF A TREE NODE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var TreeAncestor = function(n, parent) {
  this.P = Array.from({length: 20}, () => Array(n).fill(-1))
  for(let i = 0; i < parent.length; i++){
      this.P[0][i] = parent[i];
  }

  for(let i = 1; i < 20; i++){
      for(let node = 0; node < parent.length; node++){
          let nodep = this.P[i-1][node];
          if(nodep != -1) this.P[i][node] = this.P[i-1][nodep];
      }
  }  
};


TreeAncestor.prototype.getKthAncestor = function(node, k) {
  for(let i = 0; i < 20; i++){
      if(k & (1 << i)){
          node = this.P[i][node];
          if(node == -1) return -1;
      }
  }
  return node; 
};

//////////  XOR OPERATION IN AN ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const xorOperation = function(n, start) {
  const nums = []
  let i = 0
  while (i < n) {
    nums[i] = start + 2 * i
    i++
  }

  let res = nums[0]
  for(let i = 1; i < n; i++) res ^= nums[i]
  return res
};

////////// MIN NUMBER OF DAYS TO EAT N ORANGES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minDays = function (n, dp = {}) {
  if (n <= 1) return n
  if (dp[n] == null)
    dp[n] =
      1 +
      Math.min(
        (n % 2) + minDays((n / 2) >> 0, dp),
        (n % 3) + minDays((n / 3) >> 0, dp)
      )
  return dp[n]
}

////////// STRINGS DIFFER BY ONE CHARACTER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const differByOne = function(dict) {
  const n = dict.length, m = dict[0].length
  for (let j = 0; j < m; j++) {
    const seen = new Set()
    for(let i = 0; i < n; i++) {
      const newStr = dict[i].slice(0, j) + '*' + dict[i].slice(j + 1)
      if(seen.has(newStr)) return true
      seen.add(newStr)
    }
  }

  return false  
};


////////// MINIMUM NUMBER OF VERTICES TO REACH ALL NODES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var findSmallestSetOfVertices = function(n, edges) {
  const indegree = Array(n).fill(0)
  for(const [from, to] of edges) {
    indegree[to]++
  }
  let res = []
  for(let i = 0; i <n; i++) {
    const e = indegree[i]
    if(e === 0) res.push(i)
  }
  
  return res
};

////////// DETECT CYCLES IN 2D GRID ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const containsCycle = function (grid) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  const rows = grid.length
  const cols = (grid[0] || []).length
  const vis = Array.from({ length: rows }, () => Array(cols).fill(false))
  let res = false
  const dfs = (i, j, prevR, prevC, char) => {
    vis[i][j] = true
    for (let d of dirs) {
      const r = i + d[0]
      const c = j + d[1]
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        if (!(r == prevR && c === prevC)) {
          if (grid[r][c] === char) {
            if (!vis[r][c]) {
              if (dfs(r, c, i, j, char)) return true
            } else {
              if (prevR !== -1 && prevC !== -1) return true
            }
          }
        }
      }
    }
    return false
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!vis[i][j]) {
        res |= dfs(i, j, -1, -1, grid[i][j])
      }
      if (res) return true
    }
  }
  return res
}


////////// BINARY TREE UPSIDE DOWN ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const upsideDownBinaryTree = function(root) {
  let node = root, parent = null, right = null
  while(node !== null) {
    const left = node.left
    node.left = right
    right = node.right
    node.right = parent
    parent = node
    node = left
  }
  return parent
};

////////// MOST VISITED SECTOR IN A CIRCULAR TRACK ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mostVisited = function(n, rounds) {
  const arr = Array(n + 1).fill(0)
  for(let i = 1, m = rounds.length; i < m; i++) {
    let start = rounds[i - 1], end = rounds[i]

    if(i == 1) arr[start]++
    while(start !== end) {
      start += 1
      if (start === n + 1) start = 1
      arr[start]++
    }
  }
  const max = Math.max(...arr)
  const res = []
  for(let i = 1; i <= n; i++) {
    if(arr[i] === max) res.push(i)
  }
  return res
};

////////// MAKE THE XOR OF ALL SEGMENTS EQUAL TO ZERO ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const L = 2 ** 10;
const MAX = Number.MAX_SAFE_INTEGER;
const mi = Math.min;
const minChanges = (a, k) => {
    let n = a.length;
    let dp = Array(L).fill(MAX);
    dp[0] = 0;
    for (let i = 0; i < k; i++) {
        let tmp = Array(L).fill(0);
        let tot = 0;
        for (let j = i; j < n; j += k) {
            tmp[a[j]]++; 
            tot++; 
        }
        let ndp = Array(L).fill(0);
        let min = MAX;
        for (let j = 0; j < L; j++) {
            min = mi(min, dp[j]);
        }
        min += tot;
        ndp = ndp.map(x => x = min); 
        for (let j = 0; j < L; j++) {
            if (tmp[j] != 0) {
                for (let m = 0; m < L; m++) {
                    ndp[m ^ j] = mi(ndp[m ^ j], dp[m] + tot - tmp[j]);
                }
            }
        }
        dp = ndp;  
    }
    return dp[0];
};

////////// LARGEST NUMBER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const largestNumber = function(nums) {
  const arr = nums
    .map(v => v.toString())
    .sort((a, b) => (a + b < b + a ? 1 : -1))
    .join("");

  return arr[0] === "0" ? "0" : arr;
};

////////// CHECK IF ONE STRING SWAPCAN MAKE STRINGS EQUAL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const areAlmostEqual = function(s1, s2) {
  if (s1 === s2) return true
  let arr = []
  for(let i = 0, len = s1.length; i < len; i++) {
    if(s1[i] !== s2[i]) arr.push(i)
    
    if(arr.length > 2) return false
  }
  
  if(arr.length === 1) return false
  const [i1, i2] = arr
  if(s1[i2] === s2[i1] && s1[i1] === s2[i2]) return true
  return false
};

////////// EVALUATETHE BRACKET PAIRS OF A STRING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const evaluate = function(s, knowledge) {
  const map = {}
  for(let e of knowledge) {
    const [k, v] = e
    map[k] = v
  }
  const n = s.length
  let start = -1, end = 0
  let cur = ''
  const arr = []
  for(let i = 0; i < n; i++) {
    if(s[i] === '(') {
      start = i
      if(cur) {
        arr.push(cur)
        cur = ''
      }
      continue
    }
    else if(start !== -1 && s[i] !== ')') {
      cur += s[i]
    }
    else if(s[i] === ')') {
      if(cur in map) arr.push(map[cur])
      else arr.push('?')
      start = -1
      cur = ''
    } else {
      cur += s[i]
    }
    if(i === n - 1 && cur) arr.push(cur)
  }
  
  return arr.join('')
  
};

////////// MAXIMIZE NUMBER OF NICE DIVISORS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MOD = BigInt(1e9 + 7)
const maxNiceDivisors = (pf) => {
  if (pf == 1) return 1
  let bpf = BigInt(pf)
  let res
  if (pf % 3 == 0) {
    res = powmod(3n, bpf / 3n, MOD)
  } else if (pf % 3 == 1) {
    res = (powmod(3n, bpf / 3n - 1n, MOD) * 4n) % MOD
  } else {
    res = (powmod(3n, bpf / 3n, MOD) * 2n) % MOD
  }
  return Number(res)
}

const powmod = (a, b, mod) => {
  let r = 1n
  while (b > 0n) {
    if (b % 2n == 1) r = (r * a) % mod
    b >>= 1n
    a = (a * a) % mod
  }
  return r
}

////////// EMPLOYEES EARNING MORE THAN THEIR MANAGERS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SELECT Name AS Employee FROM Employee AS E,
(SELECT DISTINCT Id, Salary FROM Employee) AS M
WHERE E.ManagerId = M.Id AND E.Salary > M.Salary

////////// TRUNCATE SENTENCE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const truncateSentence = function(s, k) {
  const arr = s.split(' ')
  const sli = arr.slice(0, k)
  return sli.join(' ')
};

////////// FINDING THE USERS ACTIVE MINUTES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findingUsersActiveMinutes = function(logs, k) {
  const hash = {}, map = {}
  logs.forEach(l => {
    const [id, mi] = l
    if(hash[mi] == null) hash[mi] = new Set()
    if(map[id] == null) map[id] = new Set()
    hash[mi].add(id)
    map[id].add(mi)
  })

  const res = Array(k).fill(0)
  Object.keys(map).forEach(k => {
     const num = map[k].size
     res[num - 1]++
  })
  
  return res
  
};

////////// NUMBER OF DIFFERENT SUBSEQUENCES GCDS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countDifferentSubsequenceGCDs = function(nums) {
  const MAX = 2e5 + 1;
   const cnt = Array(MAX).fill(0)
  for (let x of nums) cnt[x] = true;
  let ret = 0;
  for (let x=1; x<MAX; x++) {
      let g = 0;
      for (let y=x; y<MAX; y+=x) {
          if (cnt[y]) g = gcd(g, y);
      }
      if (g == x) ret++;
  }
  return ret;
};

function gcd(x,y){
  if(y === 0) return x
  return gcd(y, x % y)
}

////////// SIGN OF THE PRODUCT OF AN ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const arraySign = function(nums) {
  let pos = 0, neg = 0, zero = 0
  for(let e of nums) {
    if(e > 0) pos++
    else if(e < 0) neg++
    else zero++
  }
  if(zero > 0) return 0
  if(neg % 2 === 1) return -1
  else return 1
};

////////// REVERSE BITS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const reverseBits = function(n) {
  let r = 0;
  for (let i = 0; i < 32; i++) {
    if (n & 1) {
      r = r | 1;
    } 
    if (i !== 31) {
       r = r << 1;
       n = n >> 1;
    }
  }
  return r >>> 0;
};

////////// EARLIEST AND LATEST ROUNDS WHERE PLAYERS COMPETE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const earliestAndLatest = function (n, firstPlayer, secondPlayer) {
  const { max, min } = Math
  const hash = {}
  function dp(l, r, m) {
    const key = `${l}${r}${m}`
    if (hash[key] != null) return hash[key]
    if (l > r) return dp(r, l, m)
    if (l === r) return [1, 1]
    let nxt_m = (m + 1) >> 1
    let ans = [n, 0]
    for (let i = 1; i < l + 1; i++) {
      let l_win = i - 1,
        l_lose = l - i
      for (
        let j = max(r - ~~(m / 2) - 1, 0) + l_lose + 1;
        j < min(r - 1 - l_win, nxt_m - i) + 1;
        j++
      ) {
        let tmp = dp(i, j, nxt_m)
        ans = [min(ans[0], tmp[0]), max(ans[1], tmp[1])]
      }
    }
    hash[key] = [ans[0] + 1, ans[1] + 1]
    return hash[key]
  }

  return dp(firstPlayer, n - secondPlayer + 1, n)
}

////////// FIND A PEAK ELEMENT II ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findPeakGrid = function(mat) {
  let lowCol = 0;
  let highCol = mat[0].length - 1;

  while(lowCol <= highCol) {
      let midCol = lowCol + ~~((highCol - lowCol) / 2);
      let maxRow = 0;
      for(let i = 0; i < mat.length; i++) {
          maxRow = mat[i][midCol] > mat[maxRow][midCol] ? i : maxRow;
      }

      let isLeftElementBig = midCol - 1 >= lowCol && mat[maxRow][midCol - 1] > mat[maxRow][midCol];
      let isRightElementBig = midCol + 1 <= highCol && mat[maxRow][midCol + 1] > mat[maxRow][midCol];

      if(!isLeftElementBig && !isRightElementBig) {
          return [maxRow, midCol];
      } else if(isRightElementBig) {
          lowCol = midCol + 1;
      } else {
          highCol = midCol - 1;
      }
  }
  return null;
};

////////// LARGEST ODD NUMBER IN STRING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const largestOddNumber = function(num) {
  let idx= -1
  for(let i = 0, n = num.length; i < n; i++) {
    if((+num[i]) % 2 === 1) idx = i
  }
  return num.slice(0, idx+1)
};

////////// THE NUMBER OF FULL ROUNDS YOU HAVE PLAYED ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const numberOfRounds = function(startTime, finishTime) {
  let start = 60 * parseInt(startTime.slice(0, 2)) + parseInt(startTime.slice(3))
  let finish = 60 * parseInt(finishTime.slice(0, 2)) + parseInt(finishTime.slice(3));
  if (start > finish) finish += 60 * 24; // If `finishTime` is earlier than `startTime`, add 24 hours to `finishTime`.
  return Math.max(0, Math.floor(finish / 15) - Math.ceil(start / 15)); // floor(finish / 15) - ceil(start / 15)
};

////////// COUNT SUB ISLANDS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countSubIslands = function(grid1, grid2) {
  let m = grid2.length, n = grid2[0].length, res = 0;
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (grid2[i][j] === 1) res += dfs(grid1, grid2, i, j);                 
      }
  }
  return res;  
};

function dfs(B, A, i, j) {
  let m = A.length, n = A[0].length, res = 1;
  if (i < 0 || i == m || j < 0 || j == n || A[i][j] == 0) return 1;
  A[i][j] = 0;
  res &= dfs(B, A, i - 1, j);
  res &= dfs(B, A, i + 1, j);
  res &= dfs(B, A, i, j - 1);
  res &= dfs(B, A, i, j + 1);
  return res & B[i][j];
}

////////// MINIMUM ABSOLUTE DIFFERENCE QUERIES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minDifference = function (nums, queries) {
  const res = [],
    cnt = Array.from({ length: nums.length + 1 }, () => Array(101).fill(0))

  for (let i = 0; i < nums.length; ++i) {
    for (let j = 1; j <= 100; ++j) {
      cnt[i + 1][j] = cnt[i][j] + (nums[i] == j)
    }
  }

  for (let i = 0; i < queries.length; ++i) {
    let prev = 0,
      delta = Infinity
    for (let j = 1; j <= 100; ++j)
      if (cnt[queries[i][1] + 1][j] - cnt[queries[i][0]][j]) {
        delta = Math.min(delta, prev == 0 ? Infinity : j - prev)
        prev = j
      }
    res.push(delta == Infinity ? -1 : delta)
  }
  return res
}

////////// REMOVE ONE ELEMENT TO MAKE THE ARRAY STRICTLY INCREASING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canBeIncreasing = function(nums) {
	let previous = nums[0];
	let used = false;
	for (let i = 1; i < nums.length; i++){
		if (nums[i] <= previous) {
      if (used) return false;
      used = true;
      if (i === 1 || nums[i] > nums[i - 2]) previous = nums[i];
		} else previous = nums[i];
	}
	return true;
};

////////// NUMBER OF 1 BITS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const hammingWeight = function(n) {
  let res = 0
  while(n > 0) {
    if(n & 1) res++
    n = n >>> 1
  }
  return res
};

////////// REMOVE ALL OCCURRENCES OF A SUBSTRING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var removeOccurrences = function(s, part) {
  while(s.indexOf(part) !== -1) {
    const idx = s.indexOf(part)
    s = s.slice(0, idx) + s.slice(idx + part.length)
    // console.log(s)
  }
  return s
};

////////// LARGEST SUBARRAY LENGTH ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const largestSubarray = function(nums, k) {
  const n = nums.length
  const hi = n - k
  let start = Number.MIN_VALUE, idx = -1
  for(let i = 0; i <= hi; i++) {
    if(nums[i] > start) {
      start = nums[i]
      idx = i
    }
  }
  return nums.slice(idx, idx + k)
};

////////// BIGGEST WINDOW BETWEEN VISITS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SELECT user_id, MAX(diff) AS biggest_window
FROM
(
	SELECT user_id, 
	   DATEDIFF(COALESCE(LEAD(visit_date) OVER (PARTITION BY user_id ORDER BY visit_date), '2021-01-01'), visit_date) AS diff
	FROM userVisits
) a
GROUP BY user_id
ORDER BY user_id;

////////// EXCEL SHEET COLUMN NO ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const titleToNumber = function(s) {
  let result = 0;
  const A = 'A'.charCodeAt(0)
  for (let i = 0; i < s.length; result = result * 26 + (s.charCodeAt(i) - A + 1), i++);
  return result;
};

////////// MAX UNITS ON A TRUCK ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort((a, b) => b[1] - a[1])
  let res = 0

  for (let i = 0; i < boxTypes.length && truckSize > 0; ++i) {
    let used = Math.min(boxTypes[i][0], truckSize)
    truckSize -= used
    res += used * boxTypes[i][1]
  }
  return res
}

////////// COUNT MEALS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countPairs = function (deliciousness) {
  const N = deliciousness.length
  deliciousness.sort((a, b) => a - b)
  const mp = {},
    mod = 10 ** 9 + 7
  let ret = 0
  for (let i = 0; i < N; i++) {
    if (deliciousness[i] !== 0) {
      let sum = 1 << (32 - __builtin_clz(deliciousness[i]) - 1)
      ret += mp[sum - deliciousness[i]] || 0
      ret += mp[(sum << 1) - deliciousness[i]] || 0
      if (ret >= mod) ret -= mod
    }
    if (mp[deliciousness[i]] == null) mp[deliciousness[i]] = 0
    mp[deliciousness[i]]++
  }
  return ret
}

function __builtin_clz(num) {
  if (num === 0) return 32
  return 32 - dec2bin(num).length
}

function dec2bin(num) {
  return (num >>> 0).toString(2)
}

////////// WAYS TO SPLIT ARRAY INTO THREE SUBARRAYS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const waysToSplit = function (nums) {
  const N = nums.length
  let ret = 0
  const presum = Array(N + 1).fill(0), MOD = 10 ** 9 + 7
  for (let i = 0; i < N; i++) presum[i + 1] = presum[i] + nums[i]
  let avg = (presum[N] / 3 + 1) >> 0
  for (let l = 1, m = 2, r = 2; l < N - 1; l++) {
    if (presum[l] > avg) break
    while (m < N && presum[l] > presum[m] - presum[l]) m++
    m = Math.max(m, l + 1)
    if (m > r) r = m
    while (r < N && presum[N] - presum[r] >= presum[r] - presum[l]) r++
    ret += r - m
    if (ret >= MOD) ret -= MOD
  }
  return ret
}

////////// MINIMUM OPERATIONS TO MAKE A SUBSEQUENCE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minOperations = function(target, arr) {
  const hash = {}
  for (let i = 0, n = target.length; i < n; i++) {
    hash[target[i]] = i
  }
  const stk = []
  for(let e of arr) {
    if(hash[e] == null) continue
    let l = 0, r = stk.length
    while(l < r) {
      const mid = l + (~~((r - l) / 2))
      if(stk[mid] < hash[e]) l = mid + 1
      else r = mid
    }
    stk[l] = hash[e]
  }
  return target.length - stk.length
};

////////// SUM OF SPECIAL EVENLY SPACED ELEMENTS IN ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const solve = function (nums, queries) {
  const n = nums.length
  const dividingPoint = Math.floor(Math.sqrt(n))
  const mod = 1e9 + 7
  const prefix = new Map()

  const res = new Array(queries.length)
  for (let i = 0; i < queries.length; i++) {
    let x = queries[i][0],
      y = queries[i][1]
    if (y > dividingPoint) {
      let sm = 0
      while (x < n) {
        sm += nums[x]
        sm %= mod
        x += y
      }
      res[i] = sm
    } else {
      let startingPoint = x % y
      if (!prefix.has(y)) {
        prefix.set(y, new Map())
      }
      if (!prefix.get(y).has(startingPoint)) {
        const curPrefix = []
        curPrefix.push(0)
        let cur = startingPoint,
          sm = 0
        while (cur < n) {
          sm += nums[cur]
          sm %= mod
          curPrefix.push(sm)
          cur += y
        }
        prefix.get(y).set(startingPoint, curPrefix)
      }
      const curPrefix = prefix.get(y).get(startingPoint)
      res[i] =
        (curPrefix[curPrefix.length - 1] - curPrefix[~~(x / y)] + mod) % mod
    }
  }
  return res
}

////////// CALCULATE MONEY IN LEETCODE BANK ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const totalMoney = function(n) {
  let total = 0
  for(let i = 0 ; i < n; i++) {
    const base = (i / 7) >> 0
    const remain = i % 7 + 1
    total += base + remain
  }

  return total
};

////////// MAXIMUM SCORE FROM REMOVING SUBSTRINGS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maximumGain = function (s, x, y) {
  let sb = s.split('')
  if (x > y) {
    return remove(sb, 'ab', x) + remove(sb, 'ba', y)
  }
  return remove(sb, 'ba', y) + remove(sb, 'ab', x)
  function remove(sb, pattern, point) {
    let i = 0,
      res = 0
    for (let j = 0; j < sb.length; j++) {
      sb[i++] = sb[j]
      if (
        i > 1 &&
        sb[i - 2] == pattern.charAt(0) &&
        sb[i - 1] == pattern.charAt(1)
      ) {
        i -= 2
        res += point
      }
    }
    sb.splice(i)
    return res
  }
}

////////// FINDING MK AVERAGE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

MKAverage.prototype.addElement = function (num) {
  const total = this.dataBuff.length
  this.dataBuff.push(num)
  if (total >= this.m) {
    let index = binarySearch(
      this.dataBuff,
      this.dataM,
      this.dataBuff[total - this.m]
    )
    this.dataM[index] = this.dataBuff.length - 1
    if (index === 0 || num > this.dataBuff[this.dataM[index - 1]]) {
      move2End(this.dataBuff, this.dataM, index)
    } else if (
      index === this.m - 1 ||
      num < this.dataBuff[this.dataM[index - 1]]
    ) {
      move2Start(this.dataBuff, this.dataM, index)
    }

    this.sum = 0
  } else {
    this.dataM.push(this.dataBuff.length - 1)
    move2Start(this.dataBuff, this.dataM, this.dataBuff.length - 1)
  }
}

MKAverage.prototype.calculateMKAverage = function () {
  if (this.dataM.length < this.m) {
    return -1
  } else {
    if (!this.sum) {
      this.sum = calcSum(this.dataBuff, this.dataM, this.k, this.count)
    }
    return Math.floor(this.sum / this.count)
  }
}

function binarySearch(numArr, indexArr, tar) {
  let left = 0
  let right = indexArr.length - 1

  while (left <= right) {
    let mid = (left + right) >>> 1

    if (numArr[indexArr[mid]] > tar) {
      right = mid - 1
    } else if (numArr[indexArr[mid]] < tar) {
      left = mid + 1
    } else {
      return mid
    }
  }
}
function move2Start(numArr, indexArr, index) {
  let tmp

  while (index > 0 && numArr[indexArr[index]] < numArr[indexArr[index - 1]]) {
    tmp = indexArr[index]
    indexArr[index] = indexArr[index - 1]
    indexArr[index - 1] = tmp
    index--
  }
}
function move2End(numArr, indexArr, index) {
  let tmp

  while (
    index < indexArr.length - 1 &&
    numArr[indexArr[index]] > numArr[indexArr[index + 1]]
  ) {
    tmp = indexArr[index]
    indexArr[index] = indexArr[index + 1]
    indexArr[index + 1] = tmp
    index++
  }
}

function calcSum(numArr, indexArr, start, count) {
  let sum = 0
  for (let i = 0; i < count; i++) {
    sum += numArr[indexArr[i + start]]
  }
  return sum
}

////////// MINIMUM OPERATIONS TO MAKE THE ARRAY INCREASING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minOperations = function(nums) {
  let res = 0
  let pre = nums[0]
  for(let i = 1, n = nums.length; i < n; i++) {
    const e = nums[i]
    if(e <= pre) {
      res += pre - e + 1
      pre++
    } else {
      pre = e
    }
  }
  return res
};

////////// QUERIES ON NUMBER OF POINTS INSIDE A CIRCLE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var countPoints = function(points, queries) {
  const res = []
  
  for(const [x, y, r] of queries) {
    const square = r ** 2
    const center = [x, y]
    let cnt = 0
    for(const d of points) {
      if(disSquare(d, center) <= square) {
        cnt++
      }       
    }
    res.push(cnt)
  }
  
  return res
 
 function disSquare(a, b) {
   return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
 }
};

////////// MAX XOR FOR EACH QUERY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getMaximumXor = function(nums, maximumBit) {
  const n = nums.length
  let xor = nums.reduce((ac, e) => ac ^ e, 0)
  let limit = 2 ** maximumBit - 1
  const res = []
  for(let i = n - 1; i >= 0; i--) {
    const tmp = limit ^ xor
    res.push(tmp)
    xor ^= nums[i]
  }
  
  return res
};

////////// CUSTOMERS WHO NEVER ORDER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SELECT A.Name AS `Customers` from Customers A
WHERE A.Id NOT IN (SELECT B.CustomerId from Orders B);

////////// MINIMUM NUMBER OF OPERATIONS TO MAKE STRING SORTED ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const makeStringSorted = function (s) {
  const mod = 1e9 + 7,
    n = s.length
  const a = 'a'.charCodeAt(0)
  let res = 0
  const freq = Array(26).fill(0)
  for (let c of s) {
    freq[c.charCodeAt(0) - a]++
  }
  const fact = Array(n + 1).fill(1)
  getfact()
  let l = n
  for (let c of s) {
    l--
    let t = 0,
      rev = 1
    for (let i = 0; i < 26; i++) {
      if (i < c.charCodeAt(0) - a) t += freq[i]
      rev = modmul(rev, fact[freq[i]])
    }
    res += modmul(modmul(t, fact[l]), binExpo(rev, mod - 2))
    res %= mod
    freq[c.charCodeAt(0) - a]--
  }
  return res

  function modmul(a, b) {
    const big = BigInt
    return Number(((big(a) % big(mod)) * (big(b) % big(mod))) % big(mod))
  }

  function binExpo(a, b) {
    if (b === 0) return 1
    let res = binExpo(a, Math.floor(b / 2))
    if (b & 1) {
      return modmul(a, modmul(res, res))
    } else {
      return modmul(res, res)
    }
  }

  function modmulinv(a) {
    return binExpo(a, mod - 2)
  }

  function getfact() {
    fact[0] = 1
    for (let i = 1; i <= 3000; i++) {
      fact[i] = modmul(fact[i - 1], i)
    }
  }
  
}

////////// CHECK IF THE SENTENCE IS PANGRAM ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkIfPangram = function(sentence) {
  const hash = new Map()
  for(let ch of sentence) {
    if(!hash.has(ch)) hash.set(ch, 0)
    hash.set(ch, hash.get(ch) + 1)
  }
  return hash.size >= 26
};

////////// MAX ICE CREAM BARS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxIceCream = function(costs, coins) {
  costs.sort((a, b) => a - b)
  let res = 0, idx = 0
  while(coins >= costs[idx]) {
    res++
    coins -= costs[idx++]
  }
  
  return res
};

////////// SINGLE THREADED CPU ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getOrder = function (tasks) {
  tasks = tasks.map((e, idx) => [e[0], e[1], idx])
  tasks.sort((a, b) => a[0] - b[0])
  const pq = new PriorityQueue(compare)
  const res = []
  let i = 0,
    t = 0
  while (i < tasks.length) {
    while (i < tasks.length && tasks[i][0] <= t) {
      let [ent, pt, ind] = tasks[i]
      i += 1
      pq.push([pt, ind])
    }
    if (pq.size() == 0) {
      if (i < tasks.length) t = tasks[i][0]
      continue
    }
    let [pt, ind] = pq.pop()
    res.push(ind)
    t += pt
  }
  while (pq.size()) {
    let [pt, index] = pq.pop()
    res.push(index)
  }
  return res
}

function compare(a, b) {
  if (a[0] < b[0]) return true
  else if (a[0] > b[0]) return false
  else {
    return a[1] < b[1]
  }
}

////////// REMOVE DUPLICATES FROM AN UNSORTED LINKED LIST ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteDuplicatesUnsorted = function(head) {
  const set = new Set()
  const del = new Set()
  let cur = head
  
  while(cur) {
    if(set.has(cur.val)) {
      del.add(cur.val)
    } else {
      set.add(cur.val)

    }
    cur = cur.next    
  }
  
  const dummy = new ListNode()
  dummy.next = head
  cur = dummy
  
  while(cur) {
    if(cur.next) {
      if(del.has(cur.next.val)) {
        cur.next = cur.next.next
      } else {
        cur = cur.next
      }
    } else {
      cur = cur.next        
    }
  }
  
  return dummy.next
};

////////// DESTROYING ASTEROIDS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const asteroidsDestroyed = function(mass, asteroids) {
  asteroids.sort((a, b) => a - b)
  let res = true
  for(let i = 0, n = asteroids.length; i < n; i++) {
    const cur = asteroids[i]
    if(mass >= cur) {
      mass += cur
    } else {
      res = false
      break
    }
  }
  
  return res
};

////////// REMOVE ALL ONES WITH ROW AND COLUMN FLIPS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const removeOnes = function(grid) {
  const m = grid.length
  const n = grid[0].length
  const first = grid[0], firstFliped = flip(first)
  for(let i = 1; i < m; i++) {
    if(!equal(first, grid[i]) && !equal(firstFliped, grid[i])) return false
  }
  
  return true
  
  function flip(arr) {
    const res = []
    for(const e of arr) {
      res.push(e === 1 ? 0 : 1)
    }
    return res
  }
  
  function equal(a, b) {
    const n = a.length
    for(let i = 0; i < n; i++) {
      if(a[i] !== b[i]) return false
    }
    
    return true
  }
};

////////// MAX EMPLOYEES TO BE INVITED TO A MEETING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maximumInvitations = function(favorite) {
  const n = favorite.length
  const inDegree = Array(n).fill(0)
  const { max } = Math
  for(let i = 0; i < n; i++) {
    inDegree[favorite[i]]++
  }
  
  let q = []
  const visited = Array(n).fill(0)
  const depth = Array(n).fill(1)
  for(let i = 0; i < n; i++) {
    if(inDegree[i] === 0) {
      q.push(i)
      visited[i] = 1
      depth[i] = 1
    }
  }
  
  while(q.length) {
    const cur = q.pop()
    const nxt = favorite[cur]
    inDegree[nxt]--
    if(inDegree[nxt] === 0) {
      q.push(nxt)
      visited[nxt] = 1
    }
    depth[nxt] = max(depth[nxt], depth[cur] + 1)
  }

  let maxLoopSize = 0
  let twoNodesSize = 0

  for(let i = 0; i < n; i++) {
    if(visited[i] === 1) continue
    let j = i
    let cnt = 0
    while(visited[j] === 0) {
      cnt++
      visited[j] = 1
      j = favorite[j]
    }
    
    if(cnt > 2) {
      maxLoopSize = max(maxLoopSize, cnt)
    } else if(cnt === 2) {
      twoNodesSize += depth[i] + depth[favorite[i]]
    }
  }
  
  return max(maxLoopSize, twoNodesSize)
};

////////// HOUSE ROBBER II ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const rob = function(nums) {
  if(nums.length === 0) return 0
  if(nums.length < 3) return Math.max(...nums)

  const startFromFirst = [0,nums[0]]
  const startFromSecond = [0,0]
  
  for(let i = 2; i <= nums.length; i++) {
    startFromFirst[i] = Math.max(startFromFirst[i - 1], startFromFirst[i - 2] + nums[i - 1])
    startFromSecond[i] = Math.max(startFromSecond[i - 1], startFromSecond[i - 2] + nums[i - 1])
  }
  
  return Math.max(startFromFirst[nums.length - 1], startFromSecond[nums.length])

};

////////// MAX TWIN SUM OF A LINKED LIST ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const pairSum = function(head) {
  let slow = head, fast = head
  while(fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  // reverse
  let next = null, pre = null
  while(slow) {
    next = slow.next
    slow.next = pre
    pre = slow
    slow = next
  }

  let res = 0
  while(pre) {
    res = Math.max(res, pre.val + head.val)
    pre = pre.next
    head = head.next
  }
  
  return res
};

////////// COUNT OPERATIONS TO OBTAIN ZERO ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var countOperations = function(num1, num2) {
  let res = 0
  while(num1 !== 0 && num2 !== 0) {
    if(num1 >= num2) num1 -= num2
    else num2 -= num1
    res++
  }
  return res
};

////////// CONTAINS DUPLICATE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const containsDuplicate = function(nums) {
  const hash = {};
  for (let el of nums) {
    if (hash.hasOwnProperty(el)) {
      return true;
    } else {
      hash[el] = 1;
    }
  }
  return false;
};

////////// MAX AND SUM OF ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maximumANDSum = function (nums, numSlots) {
  const n = nums.length
  nums.unshift(0)
  const m = Math.pow(3, numSlots)

  const dp = Array.from({ length: n + 1 }, () => Array(m).fill(-Infinity))
  dp[0][0] = 0

  let ret = 0

  for (let state = 1; state < m; state++) {
    let i = 0
    let temp = state
    while (temp > 0) {
      i += temp % 3
      temp = Math.floor(temp / 3)
    }
    if (i > n) continue

    for (let j = 0; j < numSlots; j++) {
      if (filled(state, j) >= 1) {
        dp[i][state] = Math.max(
          dp[i][state],
          dp[i - 1][state - Math.pow(3, j)] + (nums[i] & (j + 1))
        )
      }
    }
    if (i === n) ret = Math.max(ret, dp[i][state])
  }

  return ret
}

function filled(state, k) {
  for (let i = 0; i < k; i++) state = Math.floor(state / 3)
  return state % 3
}


////////// MAX SPLIT OF POSITIVE EVEN INTEGERS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maximumEvenSplit = function(finalSum) {
  if(finalSum % 2 === 1) return []
  const res = []
  let i = 2
  while(i <= finalSum) {
    res.push(i)
    finalSum -= i
    i += 2
  }
  
  const last = res.pop()
  res.push(finalSum + last)
  return res
};

////////// COUNT GOOD TRIPLETS IN AN ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const goodTriplets = function(a, b) {
  let n = a.length, m = new Map(), res = 0;
  for (let i = 0; i < n; i++) m.set(b[i], i);
  let fen = new Fenwick(n + 3);
  for (let i = 0; i < n; i++) {
     let pos = m.get(a[i]);
     let l = fen.query(pos), r = (n - 1 - pos) - (fen.query(n - 1) - fen.query(pos));
     res += l * r; 
     fen.update(pos, 1);
  }
  return res;
};
function Fenwick(n) {
  let tree = Array(n).fill(0);
  return { query, update }
  function query(i) {
      let sum = 0;
      i++;
      while (i > 0) {
          sum += tree[i];
          i -= i & -i;
      }
      return sum;
  }
  function update(i, v) {
      i++;
      while (i < n) {
          tree[i] += v;
          i += i & -i;
      }
  }
}

////////// TRUNCATE SENTENCE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const truncateSentence = function(s, k) {
  const arr = s.split(' ')
  const sli = arr.slice(0, k)
  return sli.join(' ')
};

////////// FINDING THE USERS ACTIVE MINUTES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findingUsersActiveMinutes = function(logs, k) {
  const hash = {}, map = {}
  logs.forEach(l => {
    const [id, mi] = l
    if(hash[mi] == null) hash[mi] = new Set()
    if(map[id] == null) map[id] = new Set()
    hash[mi].add(id)
    map[id].add(mi)
  })

  const res = Array(k).fill(0)
  Object.keys(map).forEach(k => {
     const num = map[k].size
     res[num - 1]++
  })
  
  return res
  
};

////////// MINIMUM ABSOLUTE SUM DIFFERENCE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minAbsoluteSumDiff = function (A, B) {
  const mod = 10 ** 9 + 7
  const sA = [...A].sort((a, b) => a - b)
  let res = 0
  let gain = 0

  for (let i = 0; i < A.length; i++) {
    const delta = Math.abs(A[i] - B[i])
    res += delta
 
    if (delta <= gain) continue

    const idx = binaryS(sA, B[i])

    const newDelta = Math.min(
      Math.abs(sA[idx] - B[i]),
      idx >= 1 ? Math.abs(sA[idx - 1] - B[i]) : Infinity,
      idx + 1 < A.length ? Math.abs(sA[idx + 1] - B[i]) : Infinity
    )
    gain = Math.max(gain, delta - newDelta)
  }
  return (res - gain) % mod
}
function binaryS(A, b) {
  let [l, r] = [0, A.length - 1]
  while (l < r) {
    const mid = l + ((r - l) >> 1)
    const midV = A[mid]
    if (midV === b) return mid
    if (midV < b) l = mid + 1
    else r = mid - 1
  }
  return l
}

////////// NUMBER OF DIFF SUBSEQUENCES GCDS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countDifferentSubsequenceGCDs = function(nums) {
  const MAX = 2e5 + 1;
   const cnt = Array(MAX).fill(0)
  for (let x of nums) cnt[x] = true;
  let ret = 0;
  for (let x=1; x<MAX; x++) {
      let g = 0;
      for (let y=x; y<MAX; y+=x) {
          if (cnt[y]) g = gcd(g, y);
      }
      if (g == x) ret++;
  }
  return ret;
};

function gcd(x,y){
  if(y === 0) return x
  return gcd(y, x % y)
}

////////// DUPLICATE EMAILS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

select Email
from
    (
  select Email, count(Email) as num
    from Person
    group by Email
) as statistic
where num > 1
;

////////// MINIMIZE PRODUCT SUM OF TWO ARRAYS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minProductSum = function(nums1, nums2) {
  nums1.sort((a, b) => a - b) 
  nums2.sort((a, b) => b - a)
  
  const n = nums1.length
  let res = 0
  for(let i = 0; i < n; i++) {
    res += nums1[i] * nums2[i]
  }
  
  return res
};

////////// SUBSTRINGS OF SIZE THREE WITH DISTINCT CHARACTERS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countGoodSubstrings = function(s) {
  let res = 0
  for(let i = 2; i < s.length; i++) {
    if(chk(s, i)) res++
  }
  
  return res
};

function chk(s, i) {
  return s[i - 2] !== s[i - 1] &&
    s[i - 2] !== s[i] &&
    s[i - 1] !== s[i]
}

////////// MINIMIZE MAXIMUM PAIR SUM IN ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var minPairSum = function(nums) {
  nums.sort((a, b) => a - b)
  let res = 0
  for(let i = 0, limit = nums.length / 2; i < limit; i++) {
    res = Math.max(res, nums[i] + nums[nums.length - 1 - i])
  }
  
  return res
};

////////// GET BIGGEST THREE RHOMBUS SUMS IN A GRID ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getBiggestThree = function (grid) {
  const rows = grid.length
  const cols = grid[0].length
  const res = []
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      for(let size = 0; i - size >= 0 && i + size < rows && j + size * 2 < cols; size++) {
        let tmp = 0, r = i, c = j
        do {tmp += grid[r++][c++]} while(r < rows && c < cols && r < i + size)
        if(size > 0) {
          do {tmp += grid[r--][c++]} while(c < cols && c < j + 2 * size)
          do {tmp += grid[r--][c--]} while(r > 0 && r > i - size)
          do {tmp += grid[r++][c--]} while(c > 0 && r < i)
        }
        if(res.indexOf(tmp) === -1) res.push(tmp)
        if(res.length > 3) {
          res.sort((a, b) => b - a)
          res.splice(3)
        }
      }
    }
  }
  res.sort((a, b) => b - a)
  return res
}

////////// MINIMUM XOR SUM OF TWO ARRAYS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minimumXORSum = function (nums1, nums2) {
  const n = nums1.length
  const limit = 1 << n
  const dp = Array(limit).fill(Infinity)
  dp[0] = 0
  for (let mask = 1; mask < limit; ++mask) {
    for (let i = 0; i < n; ++i) {
      if ((mask >> i) & 1) {
        dp[mask] = Math.min(
          dp[mask],
          dp[mask ^ (1 << i)] + (nums1[bitCnt(mask) - 1] ^ nums2[i])
        )
      }
    }
  }
  return dp[limit - 1]
}

function bitCnt(num) {
  let res = 0
  while (num) {
    res++
    num = num & (num - 1)
  }

  return res
}

////////// MAXIMIZE THE CONFUSION OF AN EXAM ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxConsecutiveAnswers = function(answerKey, k) {
  const helper = (str, transT) => {
    let res = 0, l = 0, r = 0, num = 0
    const n = str.length
    const target = transT === 1 ? 'T' : 'F'
    while(r < n) {
      if(str[r] === target) num++
      while(num > k) {
        if(str[l] === target) num--
        l++
      }
      res = Math.max(res, r - l + 1)
      r++
    }
    return res
  }
  
  return Math.max(helper(answerKey, 0), helper(answerKey, 1))
};

////////// MAXIMUM NUMBER OF WAYS TO PARTITION AN ARRAY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const waysToPartition = function (nums, k) {
  const n = nums.length, pre = Array(n).fill(0), suf = Array(n).fill(0)
  pre[0] = nums[0], suf[n - 1] = nums[n - 1]
  for(let i = 1; i < n; i++) {
    pre[i] = pre[i - 1] + nums[i]
    suf[n - 1 - i] = suf[n - i] + nums[n - 1 - i]
  }
  const sum = nums.reduce((ac, e) => ac + e, 0)
  let res = 0
  for(let i = 0; i < n - 1; i++) {
    if(pre[i] === suf[i + 1]) res++
  }
  const cnt = new Map()
  const arr = Array(n).fill(0)
  for(let i = 0; i < n; i++) {
    const newSum = sum - nums[i] + k
    if(newSum % 2 === 0) arr[i] += (cnt.get(newSum / 2) || 0)
    cnt.set(pre[i], (cnt.get(pre[i]) || 0) + 1)
  }
  cnt.clear()
  for(let i = n - 1; i >= 0; i--) {
    const newSum = sum - nums[i] + k
    if(newSum % 2 === 0) arr[i] += (cnt.get(newSum / 2) || 0)
    cnt.set(suf[i], (cnt.get(suf[i]) || 0) + 1)
  }
  
  for(let e of arr) {
    if(e > res) res = e
  }
  
  return res
}

////////// MINIMUM OPERATIONS TO CONVERT NUMBER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var minimumOperations = function (nums, start, goal) {
  const visited = Array(1001).fill(0)
  const q = []
  q.push([start, 0])
  visited[start] = 1
  while (q.length) {
    const [val, idx] = q.shift()
    if (val === goal) return idx
    for (let e of nums) {
      if (val + e === goal) return idx + 1
      if (val + e <= 1000 && val + e >= 0 && !visited[val + e]) {
        visited[val + e] = 1
        q.push([val + e, idx + 1])
      }
      if (val - e === goal) return idx + 1
      if (val - e <= 1000 && val - e >= 0 && !visited[val - e]) {
        visited[val - e] = 1
        q.push([val - e, idx + 1])
      }

      if ((val ^ e) === goal) return idx + 1
      if ((val ^ e) <= 1000 && (val ^ e) >= 0 && !visited[val ^ e]) {
        visited[val ^ e] = 1
        q.push([val ^ e, idx + 1])
      }
    }
  }

  return -1
}

////////// REVERSE LINKED LIST ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const reverseList = function(head) {
  if(head == null) return head
  const pre = new ListNode(null, head)
  let cur = head
  while(cur.next) {
    const tmp = pre.next
    pre.next = cur.next
    cur.next = cur.next.next
    pre.next.next = tmp
  }

  return pre.next
};

////////// CHECK IF ORIGINAL STRING EXISTS GIVEN TWO ENCODED STRINGS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const possiblyEquals = function(s1, s2) {
  const n = s1.length
  const m = s2.length
  const memo = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () => Array(1001).fill(null))
  )
  memo[0][0][1000] = true
  
  return dfs(0, 0, 0)

  function dfs(i, j, diff) {
    if(memo[i][j][diff] != null) return memo[i][j][diff]
    let res = false
    if (i == n && j == m) res = diff === 0
    else if (i < n && isDigit(s1[i])) {
      let ii = i
      while (ii < n && isDigit( s1[ii] )) ii += 1
      for (let x of helper(s1.slice(i, ii))) {
        if (dfs(ii, j, diff-x)) res = true 
      }
    } else if (j < m && isDigit( s2[j] )) {
      let jj = j 
      while (jj < m && isDigit( s2[jj] )) jj += 1
      for (let y of helper(s2.slice(j, jj))) {
        if (dfs(i, jj, diff+y)) res = true 
      }
    } else if (diff == 0) {
      if (i < n && j < m && s1[i] == s2[j]) res = dfs(i+1, j+1, 0)
    }  else if (diff > 0) {
      if (i < n) res = dfs(i+1, j, diff-1)
    } else {
      if (j < m) res = dfs(i, j+1, diff+1)
    }

    memo[i][j][diff] = res
    return res
  }

  function isDigit(ch) {
    return ch >= '0' && ch <= '9'
  }

  function helper(str) {
    const ans = new Set()
    ans.add(+str)
    for(let i = 1, len = str.length; i < len; i++) {
      const pre = helper(str.slice(0, i))
      const post = helper(str.slice(i))
      for(let p of pre) {
        for(let n of post) {
          ans.add(p + n)
        }
      }
    }
    return Array.from(ans)
  }
};

////////// COUNT VOWEL SUBSTRINGS OF A STRING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countVowelSubstrings = function(word) {
  let res = 0, n= word.length
  for(let i = 0; i < n - 1;i++) {
    for(let j = i + 1;j < n; j++) {
      if(valid(word, i, j)) res++
    }
  }
  
  return res
  
  function valid(s, i, j) {
    const set = new Set(['a', 'e', 'i', 'o','u'])
    const vis = new Set()
    for(let idx = i; idx <= j; idx++) {
      if(!set.has(s[idx])) return false
      else {
        vis.add(s[idx])
      }
    }
    // console.log(vis)
    return vis.size === 5
  }
};

////////// VOWELS OF ALL SUBSTRINGS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const countVowels = function(word) {
  let res = 0n
  const n = BigInt(word.length)
  const set = new Set(['a', 'e', 'i', 'o', 'u'])
  const dp = Array(n + 1n).fill(0n)
  for(let i = 0n; i < n; i++) {
    const ch = word[i]
    if(set.has(ch)) dp[i + 1n] = dp[i] + (i + 1n)
    else dp[i + 1n] = dp[i]
  }
  
  for(const e of dp) res += e
  return res
};

////////// DEPARTMENT TOP THREE SALARIES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SELECT D.Name AS Department, E.Name AS Employee, E.Salary AS Salary 
FROM Employee E, Department D
WHERE (SELECT COUNT(DISTINCT(Salary)) FROM Employee 
       WHERE DepartmentId = E.DepartmentId AND Salary > E.Salary) < 3
AND E.DepartmentId = D.Id 
ORDER by E.DepartmentId, E.Salary DESC;

////////// MINIMUM ADJACENT SWAPS TO REACH KTH SMALLEST NUMBER ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getMinSwaps = function (num, k) {
  const temp = num.split('')
  for (let i = 0; i < k; i++) nextPermutation(temp)
  return count(num.split(''), temp, temp.length)
}

function nextPermutation(a) {
  let i = a.length - 2

  while (i >= 0 && a[i] >= a[i + 1]) i--

  if (i >= 0) {

    const j = bSearch(a, i + 1, a.length - 1, a[i])

    a[i] = a[i] ^ a[j] ^ (a[j] = a[i])
  }

  reverse(a, i + 1, a.length - 1)
}

function bSearch(a, i, j, key) {
  while (i <= j) {
    const mid = (i + j) >>> 1
    if (key < a[mid]) i = mid + 1
    else j = mid - 1
  }
  return i - 1
}

function reverse(a, i, j) {
  while (i < j) a[i] = a[i] ^ a[j] ^ (a[j--] = a[i++])
}

function count(s1, s2, n) {
  let i = 0,
    j = 0,
    res = 0

  while (i < n) {
    j = i
    while (s1[j] != s2[i]) j++
    while (i < j) {
      const temp = s1[j]
      s1[j] = s1[j - 1]
      s1[j-- - 1] = temp
      ++res
    }
    ++i
  }
  return res
}

////////// MINIMUM INTERVAL TO INCLUDE EACH QUERY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const minInterval = function (A, Q) {
  const QQ = []
  for (let idx = 0; idx < Q.length; idx++) QQ.push([Q[idx], idx])
  QQ.sort((a, b) => a[0] - b[0])
  A.sort((a, b) => a[0] - b[0])
  let i = 0,
    N = A.length
  const ans = Array(Q.length).fill(-1)
  const m = new TreeMap()
  const pq = new PriorityQueue((a, b) => a[0] < b[0])
  for (let [q, index] of QQ) {
    for (; i < N && A[i][0] <= q; i++) {
      let len = A[i][1] - A[i][0] + 1
      if (m.get(len) == null) m.set(len, 0)
      m.set(len, m.get(len) + 1)
      pq.push([A[i][1], len])
    }
    while (pq.size() > 0 && pq.peek()[0] < q) {
      let [right, len] = pq.peek()
      m.set(len, m.get(len) - 1)
      if (m.get(len) === 0) m.remove(len)
      pq.pop()
    }
    const first = m.getMinKey()
    if (m.getLength()) ans[index] = first
  }
  return ans
}

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this.heap = []
    this.top = 0
    this.comparator = comparator
  }
  size() {
    return this.heap.length
  }
  isEmpty() {
    return this.size() === 0
  }
  peek() {
    return this.heap[this.top]
  }
  push(...values) {
    values.forEach((value) => {
      this.heap.push(value)
      this.siftUp()
    })
    return this.size()
  }
  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > this.top) {
      this.swap(this.top, bottom)
    }
    this.heap.pop()
    this.siftDown()
    return poppedValue
  }
  replace(value) {
    const replacedValue = this.peek()
    this.heap[this.top] = value
    this.siftDown()
    return replacedValue
  }

  parent = (i) => ((i + 1) >>> 1) - 1
  left = (i) => (i << 1) + 1
  right = (i) => (i + 1) << 1
  greater = (i, j) => this.comparator(this.heap[i], this.heap[j])
  swap = (i, j) => ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]])
  siftUp = () => {
    let node = this.size() - 1
    while (node > this.top && this.greater(node, this.parent(node))) {
      this.swap(node, this.parent(node))
      node = this.parent(node)
    }
  }
  siftDown = () => {
    let node = this.top
    while (
      (this.left(node) < this.size() && this.greater(this.left(node), node)) ||
      (this.right(node) < this.size() && this.greater(this.right(node), node))
    ) {
      let maxChild =
        this.right(node) < this.size() &&
        this.greater(this.right(node), this.left(node))
          ? this.right(node)
          : this.left(node)
      this.swap(node, maxChild)
      node = maxChild
    }
  }
}

function TreeMap() {
  var root = null
  var keyType = void 0
  var length = 0

  return {
    each: each,
    set: set,
    get: get,
    getTree: getTree,
    getLength: getLength,
    getMaxKey: getMaxKey,
    getMinKey: getMinKey,
    remove: remove,
  }

  function checkKey(key, checkKeyType) {
    var localKeyType = typeof key

    if (
      localKeyType !== 'number' &&
      localKeyType !== 'string' &&
      localKeyType !== 'boolean'
    ) {
      throw new Error("'key' must be a number, a string or a boolean")
    }

    if (checkKeyType === true && localKeyType !== keyType) {
      throw new Error('All keys must be of the same type')
    }

    return localKeyType
  }

  function call(callback) {
    var args = Array.prototype.slice.call(arguments, 1)

    if (typeof callback === 'function') {
      callback.apply(void 0, args)
    }
  }

  function getTree() {
    return root
  }

  function getLength() {
    return length
  }

  function each(callback) {
    internalEach(root, callback)
  }

  function internalEach(node, callback, internalCallback) {
    if (node === null) {
      return call(internalCallback)
    }

    internalEach(node.left, callback, function () {
      call(callback, node.value, node.key)

      internalEach(node.right, callback, function () {
        call(internalCallback)
      })
    })
  }

  function get(key) {
    checkKey(key)

    return internalGet(key, root)
  }

  function internalGet(key, node) {
    if (node === null) {
      return void 0
    }

    if (key < node.key) {
      return internalGet(key, node.left)
    } else if (key > node.key) {
      return internalGet(key, node.right)
    } else {
      return node.value
    }
  }

  function set(key, value) {
    if (root === null) {
      keyType = checkKey(key)
    } else {
      checkKey(key, true)
    }

    root = internalSet(key, value, root)
  }

  function internalSet(key, value, node) {
    if (node === null) {
      length++

      return {
        key: key,
        value: value,
        left: null,
        right: null,
      }
    }

    if (key < node.key) {
      node.left = internalSet(key, value, node.left)
    } else if (key > node.key) {
      node.right = internalSet(key, value, node.right)
    } else {
      node.value = value
    }

    return node
  }

  function getMaxKey() {
    var maxNode = getMaxNode(root)

    if (maxNode !== null) {
      return maxNode.key
    }

    return maxNode
  }

  function getMinKey() {
    var minNode = getMinNode(root)

    if (minNode !== null) {
      return minNode.key
    }

    return minNode
  }

  function getMaxNode(node) {
    while (node !== null && node.right !== null) {
      node = node.right
    }

    return node
  }

  function getMinNode(node) {
    while (node !== null && node.left !== null) {
      node = node.left
    }

    return node
  }

  function remove(key) {
    checkKey(key)

    root = internalRemove(key, root)
  }

  function internalRemove(key, node) {
    if (node === null) {
      return null
    }

    if (key < node.key) {
      node.left = internalRemove(key, node.left)
    } else if (key > node.key) {
      node.right = internalRemove(key, node.right)
    } else {
      if (node.left !== null && node.right !== null) {
        var maxNode = getMaxNode(node.left)

        var maxNodeKey = maxNode.key
        var maxNodeValue = maxNode.value

        maxNode.key = node.key
        maxNode.value = node.value
        node.key = maxNodeKey
        node.value = maxNodeValue

        node.left = internalRemove(key, node.left)
      } else if (node.left !== null) {
        length--
        return node.left
      } else if (node.right !== null) {
        length--
        return node.right
      } else {
        length--
        return null
      }
    }

    return node
  }
}

////////// MAXIMUM POPULATION YEAR ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maximumPopulation = function(logs) {
  const n = logs.length
  const arr = Array(101).fill(0)
  const base = 1950
  for(let log of logs) {
    const [start, end] = log
    arr[start - base]++
    arr[end - base]--
  }
  
  let res = 0, tmp = -Infinity
  for(let i = 1; i < 101; i++) {
    arr[i] += arr[i - 1]
  }
  for(let i = 0; i < 101; i++) {
    if(arr[i] > tmp) {
      res = i
      tmp = arr[i]
    }
  }
  return res + base
};

////////// MAXIMUM DISTANCE BETWEEN A PAIR OF VALUES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const maxDistance = function(nums1, nums2) {
  let res = 0
  const m = nums1.length, n = nums2.length
  for(let i = 0; i < m; i++) {
    const idx = bSearch(nums2, i, n - 1, nums1[i])
    res = Math.max(res, idx - i)
  }
  return res
};

function bSearch(a, i, j, key) {
  while (i <= j) {
    let mid = (i + j) >>> 1
    if (key <= a[mid]) i = mid + 1
    else if(key > a[mid]) j = mid - 1
  }
  return i - 1
}

////////// COMBINATION SUM ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const combinationSum3 = function(k, n) {
  const ans = [];
  combination(ans, [], k, 1, n);
  return ans;
};

function combination(ans, comb, k, start, n) {
  if (comb.length > k) {
    return;
  }
  if (comb.length === k && n === 0) {
    ans.push(comb.slice(0));
    return;
  }
  for (let i = start; i <= n && i <= 9; i++) {
    comb.push(i);
    combination(ans, comb, k, i + 1, n - i);
    comb.pop();
  }
}

////////// PARTITION ARRAY ACCORDING TO GIVEN PIVOT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var pivotArray = function(nums, pivot) {
  const less = [], greater = [], mid = []
  for(const e of nums) {
    if(e < pivot) less.push(e)
    else if(e === pivot) mid.push(e)
    else greater.push(e)
  }
 
 return less.concat(mid, greater)
};