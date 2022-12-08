#!/usr/bin/env node

const fs = require("node:fs/promises");
const readline = require("node:readline");
const argv = require("minimist")(process.argv.slice(2));
const filePath = "./memos.json";

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true
  } catch {
    return false;
  }
}

async function fileWriter(lines) {
  try {
    if (!(await exists(filePath))) {
      await fs.writeFile(filePath, '[]');
    }
    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const memos = JSON.parse(file);
    memos.push(lines)
    const data = JSON.stringify(memos);
    await fs.writeFile(filePath, data);
  } catch (err) {
    console.log(err);
  }
}

function addMemo() {
  process.stdin.setEncoding("utf8");
  const lines = [];
  const rl = readline.createInterface({
    input: process.stdin,
  });
  
  rl.on("line", (line) => {
    lines.push(line);
  });
  
  rl.on("close", () => {
    fileWriter(lines);
  });
}

async function listMemos() {
  try {
    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const memos = JSON.parse(file);
    for (const memo of memos) {
      console.log(memo[0]);
    }
  } catch (err) {
    console.log(err);
  }
}

if (argv.l) {
  listMemos();
} else {
  addMemo();
}
