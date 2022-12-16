require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
import categoryRoutes from "./routes/category";
import userRoutes from "./routes/users";
import vendorRoutes from "./routes/vendors";
import reqRoutes from "./routes/reqs";
import skillRoutes from "./routes/skills";
import fileUploadRoutes from "./routes/fileupload";
import clientRoutes from "./routes/clients";
import candidateRoutes from "./routes/candidates";


const morgan = require("morgan");

const app = express();
const http = require("http").createServer(app);

global.__basedir = __dirname;



// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));


// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", vendorRoutes);
app.use("/api", reqRoutes);
app.use("/api", clientRoutes);
app.use("/api", candidateRoutes);
app.use("/api", skillRoutes);
app.use("/api", fileUploadRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => console.log("Server running on port 8000"));
