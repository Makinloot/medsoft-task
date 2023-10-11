import { db } from "../app.js";

function getPatients(req, res) {
  try {
    const sql = `SELECT * FROM patients`;

    db.all(sql, [], (err, rows) => {
      if (err) return console.log(`Error getting rows ${err}`);
      res.json(rows);
    });
  } catch (error) {
    console.log("error getting patients");
    res.json(error);
    res.json({
      status: 400,
      success: false,
      text: `Error fetching patients: ${error}`,
    });
  }
}

export { getPatients };
