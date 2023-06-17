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
