import express from "express";
import { createJob, getJobs, updateJob, deleteOneJob, getJobById } from "../application/features/jobs";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getJobs).post(createJob);

jobsRouter.route("/:id").get(getJobById).put(updateJob).delete(deleteOneJob);

export default jobsRouter;