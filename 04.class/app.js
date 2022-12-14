#!/usr/bin/env node

const MemoController = require("./memo-controller");
const argv = require("minimist")(process.argv.slice(2));

class App {
  constructor(argv) {
    this.argv = argv;
  }

  exec() {
    if (this.argv.l) {
      MemoController.list();
    } else if (this.argv.r) {
      MemoController.select();
    } else if (this.argv.d) {
      MemoController.delete();
    } else {
      MemoController.add();
    }
  }
}

const app = new App(argv);
app.exec();
