import axios from "axios";
var Table = require("cli-table3");

export default function fetchDeps(url: string) {
  axios.get(url).then((res) => {
    if (res.status !== 200) {
      throw new Error(`Failed to fetch ${url}`);
    }
    const table1 = new Table({
      head: ["Dependency", "Version"],
      colWidths: [30, 30],
    });
    console.log("Dependencies:\n");
    for (const dep in res.data.dependencies) {
      table1.push([dep, res.data.dependencies[dep]]);
    }
    console.log(table1.toString());
    console.log("\n");
    const table2 = new Table({
      head: ["Dev Dependency", "Version"],
      colWidths: [30, 30],
    });
    console.log("Dev Dependencies:\n");
    for (const depDev in res.data.devDependencies) {
      table2.push([depDev, res.data.devDependencies[depDev]]);
    }
    console.log(table2.toString());
  });
}
