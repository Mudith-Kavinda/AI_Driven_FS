import express from "express";
import { createJob, getOneJob, getJobs } from "../application/features/jobs";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getJobs).post(createJob);

jobsRouter.route("/:id").get(getOneJob);

export default jobsRouter;