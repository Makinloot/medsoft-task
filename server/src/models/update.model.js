import { db } from "../app.js";

function updatePatient(req, res) {
  const { name, birthdate, sex, mobile, location, identification, email, id } =
    req.body;
  try {
    const sql = `UPDATE patients SET name = ?, birthdate = ?, sex = ?, mobile = ?, location = ?, identification = ?, email = ? WHERE id = ?`;
    const values = [
      name,
      birthdate,
      sex,
      mobile,
      location,
      identification,
      email,
      id,
    ];
    db.run(sql, values, (err) => {
      if (err) return console.log(`Error updating patient: ${err}`);
      res.json({
        status: 200,
        success: true,
        text: "Patient successfully updated",
      });
    });
  } catch (error) {
    res.json({
      status: 400,
      success: false,
      text: `Error updating patient: ${error}`,
    });
  }
}

export { updatePatient };
