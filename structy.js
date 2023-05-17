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

// const linkedListValues = (head) => {
//   const values = [];
//   let current = head;
//   while (current !== null) {
//     values.push(current.val);
//     current = current.next;
//   }
//   return values;
// };

// module.exports = {
//   linkedListValues,
// };

////////// SUM LIST   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const sumList = (head) => {
//   let sum = 0;
//   let current = head;
//   while (current !== null) {
//     sum += current.val;
//     current = current.next;
//   }
//   return sum;
// };

// module.exports = {
//   sumList,
// };

////////// LINKED LIST FIND   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const linkedListFind = (head, target) => {
//   let current = head;
//   while (current !== null) {
//     if (current.val === target) return true;
//     current = current.next;
//   }
//   return false;
// };

// module.exports = {
//   linkedListFind,
// };

////////// GET NODE VALUE   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const getNodeValue = (head, index) => {
//   let count = 0;
//   let current = head;
//   while (current !== null) {
//     if (count === index) return current.val;
//     current = current.next;
//     count += 1;
//   }
//   return null;
// };

// module.exports = {
//   getNodeValue,
// };

////////// REVERSE LIST   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const reverseList = (head) => {
//   let current = head;
//   let prev = null;
//   while (current !== null) {
//     const next = current.next;
//     current.next = prev;
//     prev = current;
//     current = next;
//   }
//   return prev;
// };

// module.exports = {
//   reverseList,
// };

////////// ZIPPER LIST   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const zipperLists = (head1, head2) => {
//   const head = head1;
//   let tail = head;
//   let current1 = head1.next;
//   let current2 = head2;
//   let count = 0;

//   while (current1 !== null && current2 !== null) {
//     if (count % 2 === 0) {
//       tail.next = current2;
//       current2 = current2.next;
//     } else {
//       tail.next = current1;
//       current1 = current1.next;
//     }
//     tail = tail.next;
//     count += 1;
//   }

//   if (current1 !== null) tail.next = current1;
//   if (current2 !== null) tail.next = current2;

//   return head;
// };

// module.exports = {
//   zipperLists,
// };

////////// MERGE LIST   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const mergeLists = (head1, head2) => {
//   let dummyHead = new Node(null);
//   let tail = dummyHead;
//   let current1 = head1;
//   let current2 = head2;

//   while (current1 !== null && current2 !== null) {
//     if (current1.val < current2.val) {
//       tail.next = current1;
//       current1 = current1.next;
//     } else {
//       tail.next = current2;
//       current2 = current2.next;
//     }
//     tail = tail.next;
//   }

//   if (current1 !== null) tail.next = current1;
//   if (current2 !== null) tail.next = current2;

//   return dummyHead.next;
// };

// module.exports = {
//   mergeLists,
// };

////////// IS UNIVALUE LIST   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const isUnivalueList = (head) => {
  // todo
};

module.exports = {
  isUnivalueList,
};
