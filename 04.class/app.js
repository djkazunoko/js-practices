#!/usr/bin/env node

const MemoController = require("./memo-controller");
const argv = require("minimist")(process.argv.slice(2));

class App {
  constructor(argv) {
    this.argv = argv;
  }

  exec() {
    try {
      if (Object.keys(this.argv).length >= 3) {
        throw new Error("Only one option is available.");
      } else if (this.argv.l) {
        MemoController.list();
      } else if (this.argv.r) {
        MemoController.select();
      } else if (this.argv.d) {
        MemoController.delete();
      } else {
        MemoController.add();
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

const app = new App(argv);
app.exec();
