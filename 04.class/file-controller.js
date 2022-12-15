const fs = require("node:fs/promises");

class FileController {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async read() {
    try {
      if (!(await this.#exists())) {
        await fs.writeFile(this.filePath, "{}");
      }
      const json = await fs.readFile(this.filePath, { encoding: "utf8" });
      return JSON.parse(json);
    } catch (err) {
      console.log(err.message);
    }
  }

  async write(obj) {
    try {
      const json = JSON.stringify(obj);
      await fs.writeFile(this.filePath, json);
    } catch (err) {
      console.log(err.message);
    }
  }

  async #exists() {
    try {
      await fs.access(this.filePath);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = FileController;
