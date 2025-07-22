#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const month = argv.m || today.getMonth() + 1;
const year = argv.y || today.getUTCFullYear();
const lastDate = new Date(year, month, 0).getDate();
const firstDate = new Date(year, month - 1, 1).getDay();

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDate));

for (let date = 1; date <= lastDate; date++) {
  process.stdout.write(date.toString().padStart(2));
  if ((date + firstDate) % 7 === 0) {
    console.log();
  } else {
    process.stdout.write(' ');
  }
}
