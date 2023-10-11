import express from "express";
import { getPatients } from "../models/patients.model.js";

const patientsRouter = express.Router();
patientsRouter.get("/", getPatients);

export { patientsRouter };
