import { NextFunction, Request, Response } from "express";
import Job from "../../persistence/entities/Jobs";
import NotFoundError from "../../domain/errors/not-found-error";

export const getJobs = async (req : Request, res : Response, next:NextFunction) => { 
    try {
        const jobs = await Job.find();
        return res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};

export const createJob = async (req : Request, res : Response, next:NextFunction) => { 
    try {
        const job = req.body;
        console.log(job);
        await Job.create(job);

        return res.status(201).send();
    } catch (error) {
        next(error);
    }
};

export const getJobById = async (req : Request, res : Response, next:NextFunction) => { 
    try {
        const job = await Job.findById(req.params.id);
    if (job === null) {
      throw new NotFoundError("Job not found");
    }
    return res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};

export const updateJob = async (req : Request, res : Response, next:NextFunction) => { 
    try {
        const id = req.params.id;
        const job = await Job.findByIdAndUpdate(id, req.body)

        return res.status(200).send();
    } catch (error) {
        next(error);
    }
};

export const deleteOneJob = async (req : Request, res : Response, next:NextFunction) => { 
    try {
        const id = req.params.id;
        const job = await Job.findByIdAndDelete(id)

        return res.status(200).send();
    } catch (error) {
        next(error);
    }
};

