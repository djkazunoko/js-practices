#!/usr/bin/env node

const fs = require("node:fs/promises");
const readline = require("node:readline");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true
  } catch {
    return false;
  }
}

async function fileWriter() {
  try {
    const filePath = "./memos.json";
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

process.stdin.setEncoding("utf8");
const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on("line", (line) => {
  lines.push(line);
});

rl.on("close", () => {
  fileWriter();
});
