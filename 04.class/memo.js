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
      await fs.writeFile(filePath, "{}");
    }
    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const memos = JSON.parse(file);

    let ids = Object.keys(memos).map((x) => parseInt(x));
    let id = ids.length ? Math.max(...ids) + 1 : 1;
    memos[id] = lines;

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
    for (const id in memos) {
      console.log(memos[id][0]);
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
      name: "memoId",
      message: "Choose a note you want to see:",
      choices: [],
      result() {
        return this.focused.value;
      },
    };

    for (const id in memos) {
      const obj = { name: memos[id][0], message: memos[id][0], value: id };
      question.choices.push(obj);
    }
    let answer = await prompt(question);
    const id = answer.memoId;
    const memo = memos[id];
    for (const line of memo) {
      console.log(line);
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteMemo() {
  const { prompt } = require("enquirer");

  try {
    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const memos = JSON.parse(file);

    const question = {
      type: "select",
      name: "memoId",
      message: "Choose a note you want to delete:",
      choices: [],
      result() {
        return this.focused.value;
      },
    };

    for (const id in memos) {
      const obj = { name: memos[id][0], message: memos[id][0], value: id };
      question.choices.push(obj);
    }
    let answer = await prompt(question);
    const id = answer.memoId;
    delete memos[id];
    const data = JSON.stringify(memos);
    await fs.writeFile(filePath, data);
    console.log("Successfully deleted !!");
  } catch (err) {
    console.log(err);
  }
}

if (argv.l) {
  listMemos();
} else if (argv.r) {
  selectMemos();
} else if (argv.d) {
  deleteMemo();
} else {
  addMemo();
}
