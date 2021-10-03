#!/usr/bin/env node
let fs = require('fs');
const inputArr = process.argv.slice(2);//input frpm usser

//options
let optionArr = [];
let filesArr = [];
//taking options array
for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);
  if (firstChar == '-') {
    optionArr.push(inputArr[i]);
  } else {
    filesArr.push(inputArr[i]);
  }
}
// console.log(optionArr);
// console.log(filesArr);
//node wcat.js -s -b f1.txt f2.txt
//Edge case
//option
let isBothPresent = optionArr.includes("-n") && optionArr.includes("-b");
if (isBothPresent) {
  console.log("Enter either -n or -b");
  return;
}
//existence

for (let i = 0; i < filesArr.length; i++) {
  let isPresent = fs.existsSync(filesArr[i]);
  if (isPresent == false) {
    console.log(`File ${filesArr[i]} is not present`);
    return;
  }
}
//read
let content = "";
for (let i = 0; i < filesArr.length; i++) {
  let bufferContent = fs.readFileSync(filesArr[i]);
  content += bufferContent + '\r\n';
}
// console.log(content);
let contentArr = content.split("\r\n");
// console.log(contentArr);
//-s(convert big line breaks into a singular line break )
let isSPresent = optionArr.includes("-s");
if (isSPresent == true) {
  for (let i = 1; i < contentArr.length; i++) {
    if (contentArr[i] == "" && contentArr[i - 1] == "") {
      contentArr[i] = null;
    } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
      contentArr[i] = null;
    }
  }
  let tempArr = [];
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != null) {
      tempArr.push(contentArr[i]);
    }
  }
  contentArr = tempArr;
}
console.log(".........................");
// console.log(contentArr.join("\n"));

//-n( give numbering to all the lines)
let isNPresent = optionArr.includes("-n");
if (isNPresent == true) {
  for (let i = 0; i < contentArr.length; i++) {
    contentArr[i] = `${i + 1} ${contentArr[i]}`;
  }
}
// console.log(contentArr.join("\n"));

//-b( give numbering to non-empty lines)
let isBPresent = optionArr.includes("-b");
if (isBPresent == true) {
  let counter = 1;
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != "") {
      contentArr[i] = `${counter} ${contentArr[i]}`;
      counter++;
    }
  }
}
console.log(contentArr.join("\n"));

// node wcat f1.txt f2.txt -s -b > f4.txt used to copy the text of files in third created files

// node wcat f1.txt f2.txt -s -b >> f4.txt used to append data of the files into third file


