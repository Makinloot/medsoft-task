import express from "express";
import { updatePatient } from "../models/update.model.js";

const updateRouter = express.Router();
updateRouter.post("/", updatePatient);

export { updateRouter };
