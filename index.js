const express = require("express");
const app = express();

app.post("/api/v1/deploy", (req, res) => {
  try {
    console.log(req);
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
