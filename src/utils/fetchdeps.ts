import axios from "axios";

export default function fetchDeps(url: string) {
  axios.get(url).then((res) => {
    if (res.status !== 200) {
      throw new Error(`Failed to fetch ${url}`);
    }
    console.log(res.data.dependencies);
    console.log(res.data.devDependencies);
  });
}
