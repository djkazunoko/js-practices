#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
let month = argv.m || today.getMonth() + 1;
let year = argv.y || today.getUTCFullYear();

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
