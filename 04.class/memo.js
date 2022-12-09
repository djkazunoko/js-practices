#!/usr/bin/env node

const fs = require("node:fs/promises");
const readline = require("node:readline");
const argv = require("minimist")(process.argv.slice(2));
const filePath = "./memos.json";

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fileWriter(lines) {
  try {
    if (!(await exists(filePath))) {
      await fs.writeFile(filePath, "[]");
    }
    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const memos = JSON.parse(file);
    memos.push(lines);
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

async function selectMemos() {
  const { prompt } = require("enquirer");

  try {
    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const memos = JSON.parse(file);

    const question = {
      type: "select",
      name: "memo",
      message: "Choose a note you want to see:",
      choices: [],
      result() {
        return this.focused.value;
      },
    };

    for (const memo of memos) {
      const obj = { name: memo[0], message: memo[0], value: memo };
      question.choices.push(obj);
    }
    let answers = await prompt(question);
    for (const line of answers.memo) {
      console.log(line);
    }
  } catch (err) {
    console.log(err);
  }
}

if (argv.l) {
  listMemos();
} else if (argv.r) {
  selectMemos();
} else {
  addMemo();
}
