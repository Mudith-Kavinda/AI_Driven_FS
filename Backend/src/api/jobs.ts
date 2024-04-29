import express from "express";
import { createJob, getOneJob, getJobs, updateJob, deleteOneJob } from "../application/features/jobs";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getJobs).post(createJob);

jobsRouter.route("/:id").get(getOneJob).put(updateJob).delete(deleteOneJob);

export default jobsRouter;