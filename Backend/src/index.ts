import express from "express";
import "dotenv/config"
import jobsRouter from "./api/jobs";
import jobApplicationRouter from "./api/jobApplication";
import { connectDB } from "./persistence/db";

const port = 8000;
const app = express();
connectDB();

app.use(express.json());
app.use("/jobs", jobsRouter)
app.use("/jobApplications", jobApplicationRouter)


app.listen(port, () => console.log(`Server is listening on port ${port}.`));
