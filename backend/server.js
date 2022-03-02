const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const tweetRouter = require("./routes/tweet");
const userRouter = require("./routes/user");
app.use("/tweets", tweetRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
