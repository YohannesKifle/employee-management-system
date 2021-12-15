const { app } = require("./app.js");
const { PORT } = require("./config/secrets.config");

// Connecting to mongodb
require("./config/database.config");

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
