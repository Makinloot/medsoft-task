import { db } from "../app.js";

function insertPatient(req, res) {
  try {
    const {
      name,
      birthdate,
      sex,
      mobile,
      location,
      identification,
      email,
      id,
    } = req.body;
    const sql = `INSERT INTO patients (name, birthdate, sex, mobile, location, identification, email, id) VALUES(?,?,?,?,?,?,?,?)`;
    db.run(
      sql,
      [name, birthdate, sex, mobile, location, identification, email, id],
      (err) => {
        if (err) return console.log(`Error creating new patient, ${err}`);
        res.json({
          status: 200,
          success: true,
          text: "New patient has been created",
        });
      }
    );
  } catch (error) {
    res.json({
      status: 400,
      success: false,
      text: `Error creating new patient: ${error}`,
    });
  }
}

export { insertPatient };
