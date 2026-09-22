let fs = require('fs');

// fs.readFile('file1.txt','utf-8', (err, data)=>{
//     console.log(data);
// })

// let data = fs.readFileSync('file1.txt');
// console.log(data.toString())

// fs.writeFile('file2.txt', 'This is new file data from ABESIT.',(err)=>{
//     console.log("error : "+err);
// })


let data = fs.writeFileSync('file2.txt', 'New File Data from NodeJs');

console.log(data);

console.log("File read end here. enjoy ur day..")
console.log("File read end here. enjoy ur day..")
console.log("File read end here. enjoy ur day..")