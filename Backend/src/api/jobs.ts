import express from "express";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { createJob, getJobs, updateJob, deleteOneJob, getJobById } from "../application/features/jobs";
import AuthorizationMiddleware from "./middleware/authorization-middleware";

const jobsRouter = express.Router();

jobsRouter.route("/")
.get(getJobs)
.post(ClerkExpressRequireAuth({}), createJob);

jobsRouter.route("/:id")
.get(ClerkExpressRequireAuth({}),getJobById)
.put(ClerkExpressRequireAuth({}), AuthorizationMiddleware,updateJob)
.delete(ClerkExpressRequireAuth({}), AuthorizationMiddleware,deleteOneJob);

export default jobsRouter;