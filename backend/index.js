const app = require("./app.js");
require("dotenv").config();

const { PORT } = process.env;
const hostname = "192.168.1.10";

app.listen(PORT, hostname, () => {
  console.log(`Server running on http://${hostname}:${PORT}/`);
});
