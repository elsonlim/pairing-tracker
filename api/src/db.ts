import mongoose from "mongoose";
const mongoOptions: {
  useNewUrlParser: boolean;
  user?: string;
  pass?: string;
} = {
  useNewUrlParser: true,
};

console.log(`connecting to ${process.env.DB_HOST}`);
mongoose.connect(`${process.env.DB_HOST}`, mongoOptions);
const db = mongoose.connection;

db.on("error", err => console.log("error connecting to db:" + err));
db.once("open", () => {
  console.log("connected to mongodb");
});
