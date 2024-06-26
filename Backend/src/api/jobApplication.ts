import express from "express";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import "dotenv/config";
import { createJobApplicaton, getJobApplications, getJobApplicationsById } from "../application/features/jobApplication";
import AuthorizationMiddleware from "./middleware/authorization-middleware";

const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/")
.get(ClerkExpressRequireAuth({}),getJobApplications)
.post(ClerkExpressRequireAuth({}), createJobApplicaton);

jobApplicationRouter.route("/:id")
.get(ClerkExpressRequireAuth({}),  getJobApplicationsById);

export default jobApplicationRouter;