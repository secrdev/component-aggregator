import axios from "axios";

export default function fetchDeps(url: string) {
  axios.get(url).then((res) => {
    if (res.status !== 200) {
      throw new Error(`Failed to fetch ${url}`);
    }
    console.log("Dependencies:\n");
    for (const dep in res.data.dependencies) {
      console.log(`${dep}:${res.data.dependencies[dep].replace("^", "")}`);
    }
    console.log("\n");
    console.log("Dev Dependencies:\n");
    for (const depDev in res.data.devDependencies) {
      console.log(
        `${depDev}:${res.data.devDependencies[depDev].replace("^", "")}`
      );
    }
  });
}
