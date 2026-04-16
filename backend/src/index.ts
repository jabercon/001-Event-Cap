import express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Event Cap API is running (TypeScript)");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
