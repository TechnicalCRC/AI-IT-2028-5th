let path = require('path');

let str = "c:\\tc\\bin\\myfile.txt";
let p1 = path.basename(str);
console.log(p1)
let p2 = path.dirname(str);
console.log(p2)
let p3 = path.extname(str);
console.log(p3)