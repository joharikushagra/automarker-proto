const json = require("./results.json");
const http = require("http");
const fs = require("fs");
const express = require("express");
const { execSync, exec } = require("child_process");
const util = require("node:util");
const execFile = util.promisify(require("node:child_process").execFile);
const statsTest = () => {
  const { suites } = json;
  const { specs: tests } = json["suites"][0]["suites"][0];
  passed = tests.filter((t) => t.ok);
  passed.forEach((element) => {
    console.log(element.title, { ok: element.ok });
  });
  console.log("Percentage Passed", (passed.length / tests.length) * 100);
};

const app = express();

const PORT = 8080;

// const writeToFile = () => {
//   fs.appendFile(
//     "./tests/automarker.spec.js",
//     `test.beforeEach(async ({ page }) => {
//             //   // await page.goto("http://127.0.0.1:5500/automarker-proto/index.html");
//                await page.goto("http://localhost:${PORT}");
//              });`,
//     (err) => {
//       if (err) throw err;
//       console.log("File written successfully");
//     }
//   );
// };

// fs.readFile("./submission/index.html", (err, html) => {
//   if (err) throw err;
//   const server = http.createServer((req, res) => {
//     res.writeHeader(200, { "Content-Type": "text/html" });
//     res.write(html);
//     res.end();
//     exec("bash tests.sh", (error, stdout, stderr) => {
//       if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//     });
//   });
//   server.listen(4000, () => console.log("File read server started at 4000"));
// });

function runit(cmd, timeout) {
  var ch = exec(cmd, function (error, stdout, stderr) {
    if (error) {
      // reject(error);
    } else {
      // resolve("program exited without an error");
      console.log("calling stats");
      statsTest();
    }
  });
  ch.on("error", (err) => console.log({ err }));
  // return new Promise(function (resolve, reject) {
  // setTimeout(function () {
  //   resolve("program still running");
  // }, timeout);
  // });
}

// function runScript() {
//   runit("npm run dev", 5000)
//     .then((d) => {
//       console.log(d);
//       setTimeout(statsTest, 12000);
//     })
//     .catch((err) => console.log(err));
// }

app.get("/", async (req, res) => {
  console.log("abc");
  try {
    const serveRes = exec("serve -l 8081 -s submission");
    setTimeout(() => console.log("deploying"), 100);
    console.log({ serveRes });
  } catch (error) {
    console.log({ error });
  }
  try {
    const testRes =  runit("npm run dev", 15000);
    console.log({ testRes });
  } catch (error) {
    console.log({ error });
  }
  // setTimeout(statsTest, 30000);
  // exec("serve -l 8081 -s submission", (error, stdout, stderr) => {
  //   console.log("abcd");
  //   if (error) {
  //     console.log(`error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });
  return res.json({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
