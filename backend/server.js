const express = require("express");
const { connectDB } = require("./utiles/db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", require("./routes/authRoutes"));
app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => console.log(`server started at ${port}!`));
