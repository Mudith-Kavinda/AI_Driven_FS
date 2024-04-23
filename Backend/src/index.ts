import express from "express";
import jobsRouter from "./api/jobs";
import { connectDB } from "./persistence/db";

const port = 8000;
const app = express();
connectDB();

app.use(express.json());
app.use("/jobs", jobsRouter)


app.listen(port, () => console.log(`Server is listening on port ${port}.`));
