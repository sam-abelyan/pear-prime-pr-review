import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

export default app;