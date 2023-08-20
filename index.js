const express = require("express");
const app = express();
const port = 3000; // You can change this port if needed

app.get("/", (req, res) => {
  res.send("Hello all!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
