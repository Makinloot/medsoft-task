import express from "express";
import { deletePatient } from "../models/delete.model.js";

const deleteRouter = express.Router();
deleteRouter.post("/", deletePatient);

export { deleteRouter };
