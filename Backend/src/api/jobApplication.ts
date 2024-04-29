import express from "express";
import { createJobApplicaton, getJobApplications } from "../application/features/jobApplication";

const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/").get(getJobApplications).post(createJobApplicaton);

export default jobApplicationRouter;