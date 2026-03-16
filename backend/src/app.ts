import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
