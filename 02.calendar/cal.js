const argv = require("minimist")(process.argv.slice(2));
const date = new Date();
const month = argv.m || date.getMonth() + 1;
const year = argv.y || date.getFullYear()
const start_of_month = new Date(year, month - 1);
const end_of_month = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
const space_for_first_day = ' '.repeat(3).repeat(start_of_month.getDay());
process.stdout.write(space_for_first_day);
for (const d = start_of_month; d <= end_of_month; d.setDate(d.getDate() + 1)) {
  let day = String(d.getDate()).padStart(2, " ");
  const color_reverse = "\x1b[7m";
  const color_reset = "\x1b[0m";
  if (
    d.getFullYear() == date.getFullYear() &&
    d.getMonth() == date.getMonth() &&
    d.getDate() == date.getDate()
  ) {
    day = `${color_reverse}${day}${color_reset}`
  }
  process.stdout.write(`${day} `);
  if (d.getDay() == 6) {
    console.log();
  }
}
