const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
