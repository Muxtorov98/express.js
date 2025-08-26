const app = require("./app");

const port = process.env.PORT;
const db = process.env.MONGO_URI;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port} || ${db}`);
});
