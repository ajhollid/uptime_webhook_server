const express = require("express");
const app = express();
app.use(express.json());
const { exec } = require("child_process");

app.post("/api/v1/deploy", (req, res) => {
  try {
    if (req.headers["x-github-event"] === "pull_request") {
      const pullRequest = req.body.pull_request;
      if (pullRequest.merged === true && pullRequest.base.ref === "master") {
        exec("sh ../test.sh", (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
      }
    }
    res
      .status(200)
      .json({ status: "success", message: "Deployed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: error, message: "Failed to deploy" });
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
