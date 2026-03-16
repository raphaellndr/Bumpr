import cors from "cors";
import express from "express";

import errorHandler from "./middlewares/error";
import authRouter from "./routes/auth";
import claimRouter from "./routes/claim";

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

app.use("/claims", claimRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

export default app;
