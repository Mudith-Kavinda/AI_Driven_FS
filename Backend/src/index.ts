import express from "express";
import "dotenv/config"
import cors from "cors";
import jobsRouter from "./api/jobs";
import jobApplicationRouter from "./api/jobApplication";
import { connectDB } from "./persistence/db";
import GlobalErrorHandlerMiddleware from "./api/middleware/global-error-handling-middleware";

const port = process.env.PORT || 8000;
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobApplicationRouter);

app.use(GlobalErrorHandlerMiddleware);


app.listen(port, () => console.log(`Server is listening on port ${port}.`));
