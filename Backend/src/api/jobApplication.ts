import express from "express";
import { createJobApplicaton, getJobApplications, getJobApplicationsById } from "../application/features/jobApplication";

const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/").get(getJobApplications).post(createJobApplicaton);

jobApplicationRouter.route("/:id").get(getJobApplicationsById);

export default jobApplicationRouter;