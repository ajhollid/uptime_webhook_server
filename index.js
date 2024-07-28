const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/v1/deploy", (req, res) => {
  try {
    if (req.headers["x-github-event"] === "pull_request") {
      const pullRequest = req.body.pull_request;
      if (pullRequest.merged === true && pullRequest.base.ref === "master") {
        console.log("run deploy script");
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
