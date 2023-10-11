import express from "express";
import { insertPatient } from "../models/insert.model.js";

const insertRouter = express.Router();
insertRouter.post("/", insertPatient);

export { insertRouter };
