#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
let month = argv.m || today.getMonth() + 1;
let year = argv.y || today.getUTCFullYear();
let last_date = new Date(year, month, 0).getDate();
let first_day = new Date(year, month - 1, 1).getDay();

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let date = 1; date <= last_date; date++) {
  process.stdout.write(`${date}`);
  if ((date + first_day) % 7 === 0) {
    console.log();
  }
}
