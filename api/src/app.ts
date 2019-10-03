import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();
import pairMatrixRoute from "./routes/pairMatrix.route";
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/pair-matrix", pairMatrixRoute);
app.get("/status", (req, res) => {
  res.json({ status: "up" });
});

export default app;
