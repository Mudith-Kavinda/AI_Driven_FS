import { Request, Response, NextFunction } from "express";
import JobApplication from "../../persistence/entities/JobApplication";

export const createJobApplicaton = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const jobApplication = req.body;
        await JobApplication.create(jobApplication);
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send();
    }
};

export const getJobApplications = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const jobApplications = await JobApplication.find().populate("job");
        return res.status(200).json(jobApplications);
    } catch (error) {
        return res.status(500).send();
    }
};

export const getJobApplicationsById = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        const jobApplication = await JobApplication.findById(id).populate("job");
        return res.status(200).json(jobApplication);
    } catch (error) {
        return res.status(500).send();
    }
};