import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
import app from "./app";

app.listen(port, () => console.log("connected to port: " + port));
