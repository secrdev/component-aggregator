import axios from "axios";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/repos/:org/:repo", (req: any, response: any) => {
  const option = req.query.option;
  switch (option) {
    case "packages":
      axios
        .get(
          `https://raw.githubusercontent.com/${req.params.org}/${req.params.repo}/master/package.json`
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
        })
        .catch((err) => {
          response.status(500).send(err);
        });
      break;
    case "webpack":
      response.send("not available yet");
      break;
    case "rollup":
      response.send("not available yet");
      break;
    default:
      response.send("invalid option");
      break;
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
