////////// TWO SUM   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const twoSum = function(nums, target) {

  for (let i = 0; i < nums.length; i++) {
      for (let j = i+1; j < nums.length; j++) {
          if (nums[i] + nums[j] === target){
              return [i,j]
          }
      }
  } 
};

////////// REG EXPRESSION MATCHING   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isMatch = function(s, p) {
    let memory = new Array(s.length + 1)
      .fill(0)
      .map(e => new Array(p.length + 1).fill(-1));
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

  const isSameTree = function(p, q) {
    if(p == null || q == null) return p === q
    if(p.val !== q.val) return false
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  };

    ////////// MINIMUM COST   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const mergeStones = function(stones, K) {
        const KMO = K - 1
        const N = stones.length
        if ((N - 1) % KMO !== 0) return -1
        const sum = [0]
        const dp = stones.map(s => stones.map(s1 => 0))
        stones.forEach(s => {
          sum.push(sum[sum.length - 1] + s)
        })
        for (let e = KMO; e < N; e++) {
          for (let b = e - KMO; b >= 0; b--) {
            for (let split = e - 1; split >= b; split -= KMO) {
              let cost = dp[b][split] + dp[split + 1][e]
              dp[b][e] = dp[b][e] === 0 ? cost : Math.min(dp[b][e], cost)
            }
            if ((e - b) % KMO === 0) {
              dp[b][e] += sum[e + 1] - sum[b]
            }
          }
        }
        return dp[0][N - 1]
      }

////////// GRID ILLUMINATION   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gridIllumination = function (N, lamps, queries) {
    const rowMap = new Map()
    const colMap = new Map()
    const hillMap = new Map()
    const daleMap = new Map()
    const litMap = new Map()
    const direction = [
      [0, 0],
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
      [-1, -1],
      [1, 1],
    ]
    //map what areas are lit
    for (let [x, y] of lamps) {
      insert(rowMap, x)
      insert(colMap, y)
      insert(hillMap, x + y)
      insert(daleMap, x - y)
      litMap.set(N * x + y, true)
    }
    const result = new Array(queries.length).fill(0)
    let count = 0
    for (let [x, y] of queries) {
      if (
        rowMap.get(x) > 0 ||
        colMap.get(y) > 0 ||
        hillMap.get(x + y) > 0 ||
        daleMap.get(x - y) > 0
      ) {
        result[count] = 1
      }
      for (let [i, j] of direction) {
        let newX = x + i
        let newY = y + j
        if (litMap.has(N * newX + newY)) {
          decrease(rowMap, newX)
          decrease(colMap, newY)
          decrease(hillMap, newX + newY)
          decrease(daleMap, N * newX + newY)
          litMap.delete(N * newX + newY)
        }
      }
      count++
    }
    return result
  }
  const insert = (map, value) => {
    if (map.has(value)) {
      map.set(value, map.get(value) + 1)
    } else {
      map.set(value, 1)
    }
  }
  const decrease = (map, value) => {
    if (map.has(value)) {
      map.set(value, map.get(value) - 1)
    }
  }