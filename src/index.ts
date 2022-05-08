import axios from "axios";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/repos", (req: any, response: any) => {
  axios
    .get(
      `https://raw.githubusercontent.com/${req.query.org}/${req.query.repo}/master/package.json`
    )
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`Failed to fetch`);
      }
      const dependencies = [];
      for (const dep in res.data.dependencies) {
        dependencies.push({
          dependency: dep,
          version: res.data.dependencies[dep],
        });
      }
      const devDependencies = [];
      for (const depDev in res.data.devDependencies) {
        devDependencies.push({
          dependency: depDev,
          version: res.data.devDependencies[depDev],
        });
      }
      response.send(dependencies.concat(devDependencies));
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
