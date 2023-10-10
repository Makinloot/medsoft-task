import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";
import sqlite from "sqlite3";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new sqlite.Database(
  path.join(__dirname, "..", "patients.db"),
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) return console.log(`Error connecting to database, ${err}`);
    console.log("Database connection successful");
  }
);
// db.run(`CREATE TABLE patients(name, birthdate, sex, mobile, location, id)`);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "dist")));

app.post("/insert", (req, res) => {
  try {
    const { name, birthdate, sex, mobile, location, id } = req.body;
    const sql = `INSERT INTO patients (name, birthdate, sex, mobile, location, id) VALUES(?,?,?,?,?,?)`;
    db.run(sql, [name, birthdate, sex, mobile, location, id], (err) => {
      if (err) return console.log(`Error creating new patient, ${err}`);
      console.log("New patient has been created");
      res.send("New patient has been created");
    });
    // db.close((err) => {
    //   if (err) return console.log("Error closing DB");
    // });
  } catch (error) {
    console.log(`Error inserting new patient, ${error}`);
    res.send(`Error inserting new patient, ${error}`);
  }
});

app.get("/patients", (req, res) => {
  try {
    const sql = `SELECT * FROM patients`;

    db.all(sql, [], (err, rows) => {
      if (err) return console.log(`Error getting rows ${err}`);
      rows.forEach((row) => {
        console.log(row);
      });
      res.json(rows);
    });
  } catch (error) {
    console.log("error getting patients");
    res.json(error);
  }
});

export { app };
