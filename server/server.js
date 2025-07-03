import express from "express";
import cors from "cors";
import jsonServer from "json-server";

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors()); // 💥 Enables CORS for ALL domains
app.use(express.json());
app.use(middlewares);
app.use("/", router); // use "/" NOT "/api" to match your frontend calls

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
