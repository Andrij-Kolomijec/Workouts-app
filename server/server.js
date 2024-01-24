require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "sup" });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000.");
});
