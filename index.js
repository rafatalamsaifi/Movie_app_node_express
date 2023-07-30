const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes");
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/", route);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
