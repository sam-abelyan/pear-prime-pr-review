import express from "express";
import bodyParser from "body-parser";
import compatibilityRouter from "./routes/compatibility";

const app = express();
app.use(bodyParser.json());

app.use(compatibilityRouter);

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

export default app;