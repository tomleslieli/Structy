////////// UNCOMPRESS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const uncompress = (s) => {

//   let nums = '1234567890';
//   let res = [];

//   let i = 0;
//   let j = 0;

//   while (j < s.length){
//       if (nums.includes(s[j])){
//           j ++
//       }
//       else {
//         let currNum = s.slice(i,j);
//         for (let i = 0; i < currNum; i++){
//           res.push(s[j]);
//         }
//         j++;
//         i=j;
//       }
//   }

//   return res.join('')
// };

// module.exports = {
//   uncompress,
// };

////////// COMPRESS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const compress = (s) => {
//   let res =[];

//   let i = 0;
//   let j = 0;

//   while (j <= s.length){
//     if (s[i] === s[j]){
//       j++;
//     } else {
//       let num = j - i;
//       if (num === 1) {
//         res.push(s[i]);
//       } else {
//       res.push(num,s[i])
//       }
//       i = j;
//     }
//   }

//   return res.join('')
// };

// module.exports = {
//   compress,
// };

////////// ANAGRAMS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const anagrams = (s1, s2) => {
//   const count = {};

//   for (let char of s1){
//     if (!(count[char])){
//       count[char] = 0;
//     }
//     count[char] += 1;
//   }

//   for (let char of s2){
//     if (!(count[char])){
//       return false;
//     } else {
//       count[char] -= 1;
//     }
//   }

//   for (let char in count){
//     if (count[char] !== 0){
//       return false;
//     }
//   }
//   return true;
// };

// module.exports = {
//   anagrams,
// };

////////// MOST FREQUENT CHAR ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const mostFrequentChar = (s) => {
//   const count = {};

//   for (let char of s){
//     if (!(count[char])){
//       count[char] = 0;
//     }
//     count[char] += 1;
//   }

//   let maxNum = 0;
//   let maxChar;

//   for (let char in count){
//     if (count[char] > maxNum){
//       maxNum = count[char];
//       maxChar = char;
//     }
//   }
//   return maxChar;
// };

// module.exports = {
//   mostFrequentChar,
// };

////////// PAIR SUM ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const pairSum = (numbers, targetSum) => {
//   const prev = {};

//   for (let i = 0; i < numbers.length; i++){
//     const num = numbers[i];
//     const diff = targetSum - num;

//     if (diff in prev){
//       return [i, prev[diff]]
//     }

//     prev[num] = i;
//   }
// };

// module.exports = {
//   pairSum,
// };

////////// PAIR PRODUCT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const pairProduct = (numbers, targetProduct) => {

//     let hash = {};

//     for (let i = 0; i < numbers.length; i++){
//       let current = numbers[i];
//       let complement = targetProduct / current;

//       if (complement in hash){
//         return [i, hash[complement]]
//       }

//       hash[current] = i;
//     }

//     };

//     module.exports = {
//       pairProduct,
//     };

////////// INTERSECTION  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const intersection = (a, b) => {
//     const set = new Set(a);
//     const res = [];

//       for (let i of b){
//         if (set.has(i)){
//       res.push(i);
//         }
//     }

//     return res
//   };

//   module.exports = {
//     intersection,
//   };

////////// FIVE SORT  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const fiveSort = (nums) => {
//     let i = 0;
//     let j = nums.length - 1;

//     while (i <= j){
//       if (nums[j] === 5){
//         j -= 1;
//       } else if (nums[i] === 5){
//         [nums[i], nums[j]] = [nums[j], nums[i]]
//         i += 1;
//       } else {
//         i += 1;
//       }
//     }
//     return nums;
//   };

//   module.exports = {
//     fiveSort,
//   };

////////// LINKED LIST VALUES  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const linkedListValues = (head) => {
  // todo
};

module.exports = {
  linkedListValues,
};
