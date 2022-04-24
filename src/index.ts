import fetchDeps from "./utils/fetchdeps";

fetchDeps(
  `https://raw.githubusercontent.com/${process.argv[2]}/master/package.json`
);
