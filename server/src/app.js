import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";
import sqlite from "sqlite3";
import { deleteRouter } from "./routes/delete.route.js";
import { patientsRouter } from "./routes/patients.route.js";
import { updateRouter } from "./routes/update.route.js";
import { insertRouter } from "./routes/insert.route.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect to database
export const db = new sqlite.Database(
  path.join(__dirname, "..", "patients.db"),
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) return console.log(`Error connecting to database, ${err}`);
    console.log("Database connection successful");
  }
);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "dist")));
// routes
app.use("/insert", insertRouter);
app.use("/patients", patientsRouter);
app.use("/delete", deleteRouter);
app.use("/update", updateRouter);

export { app };
