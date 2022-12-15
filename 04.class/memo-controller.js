const readline = require("node:readline");
const { once } = require("node:events");
const { prompt } = require("enquirer");
const FileController = require("./file-controller");
const filePath = "./memos.json";

class MemoController {
  static async add() {
    try {
      process.stdin.setEncoding("utf8");
      const lines = [];
      const rl = readline.createInterface({
        input: process.stdin,
      });

      rl.on("line", (line) => {
        lines.push(line);
      });

      await once(rl, "close");

      const fileController = new FileController(filePath);
      const memos = await fileController.read();

      let ids = Object.keys(memos).map((x) => parseInt(x));
      let id = ids.length ? Math.max(...ids) + 1 : 1;
      memos[id] = lines;

      await fileController.write(memos);
    } catch (err) {
      console.log(err.message);
    }
  }

  static async list() {
    try {
      const fileController = new FileController(filePath);
      const memos = await fileController.read();
      if (!Object.keys(memos).length) {
        throw new Error("Please create at least one note.");
      }
      
      for (const id in memos) {
        console.log(memos[id][0]);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  static async select() {
    try {
      const fileController = new FileController(filePath);
      const memos = await fileController.read();
      if (!Object.keys(memos).length) {
        throw new Error("Please create at least one note.");
      }

      const question = {
        type: "select",
        name: "memoId",
        message: "Choose a note you want to see:",
        choices: [],
        result() {
          return this.focused.value;
        },
      };

      let answer = await this.#getAnswer(memos, question);
      const memo = memos[answer.memoId];
      for (const line of memo) {
        console.log(line);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  static async delete() {
    try {
      const fileController = new FileController(filePath);
      const memos = await fileController.read();
      if (!Object.keys(memos).length) {
        throw new Error("Please create at least one note.");
      }

      const question = {
        type: "select",
        name: "memoId",
        message: "Choose a note you want to delete:",
        choices: [],
        result() {
          return this.focused.value;
        },
      };

      let answer = await this.#getAnswer(memos, question);
      delete memos[answer.memoId];
      await fileController.write(memos);
      console.log("Successfully deleted !!");
    } catch (err) {
      console.log(err.message);
    }
  }

  static async #getAnswer(memos, question) {
    try {
      for (const id in memos) {
        const obj = { name: memos[id][0], message: memos[id][0], value: id };
        question.choices.push(obj);
      }
      return await prompt(question);
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = MemoController;
