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
      } else if (Object.keys(this.argv).some(this.#isNotOption)) {
        throw new Error("Only options -r, -l and -d are available.");
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

  #isNotOption(value) {
    return value != "l" && value != "r" && value != "d" && value != "_";
  }
}

const app = new App(argv);
app.exec();
