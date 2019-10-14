import cors from "cors";
import express from "express";
import morgan from "morgan";
import "./db";
import pairMatrixRoute from "./routes/pairMatrix.route";
import userRoute from "./routes/user.route";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/pair-matrix", pairMatrixRoute);
app.use("/user", userRoute);
app.get("/status", (req, res) => {
  res.json({ status: "up" });
});

export default app;
