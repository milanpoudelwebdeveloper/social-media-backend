import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import morgan from "morgan";

require("dotenv").config();

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB is connected successfully"))
  .catch((e) => console.log("Database connection error", e));

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

//prefixing all the routes with api

fs.readdirSync("./routes").map((r) =>
  app.use("/api/", require(`./routes/${r}`))
);

//port and app connection

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on", ${PORT}`));
