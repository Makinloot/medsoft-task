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

app.post("/delete", (req, res) => {
  const { id } = req.body;

  try {
    const sql = "DELETE FROM patients WHERE id = ?";
    db.run(sql, id, (err) => {
      if (err) return console.log(`Error deleting patient: ${err}`);

      console.log(`Patient ${id} has been deleted`);
      res.json(`Patient ${id} has been deleted`);
    });
  } catch (error) {
    console.log(`Error deleting patient: ${error}`);
    res.json(`Error deleting patient: ${error}`);
  }
});

app.post("/update", (req, res) => {
  const { name, birthdate, sex, mobile, location, id } = req.body;
  try {
    const sql = `UPDATE patients SET name = ?, birthdate = ?, sex = ?, mobile = ?, location = ? WHERE id = ?`;
    const values = [name, birthdate, sex, mobile, location, id];
    db.run(sql, values, (err) => {
      if (err) {
        console.log(`Error updating patient with ID 3161652417648536: ${err}`);
      }
      res.json(`Patient successfully updated`);
    });
  } catch (error) {
    console.log(`Error updating patient: ${error}`);
    res.json(`Error updating patient: ${error}`);
  }
});

export { app };
