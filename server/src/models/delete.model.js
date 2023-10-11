import { db } from "../app.js";

function deletePatient(req, res) {
  const { id } = req.body;

  try {
    const sql = "DELETE FROM patients WHERE id = ?";
    db.run(sql, id, (err) => {
      if (err) return console.log(`Error deleting patient: ${err}`);

      res.json({
        status: 200,
        success: true,
        text: `Patient ${id} has been deleted`,
      });
    });
  } catch (error) {
    res.json({
      status: 400,
      success: false,
      text: `Error deleting patient: ${error}`,
    });
  }
}

export { deletePatient };
