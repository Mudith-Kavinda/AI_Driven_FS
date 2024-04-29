import { NextFunction, Request, Response } from "express";
import Job from "../../persistence/entities/Jobs";

export const getJobs = async (req : Request, res : Response) => { 
    try {
        const jobs = await Job.find();
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).send();
    }
};

export const createJob = async (req : Request, res : Response) => { 
    try {
        const job = req.body;
        console.log(job);
        await Job.create(job);

        return res.status(200).send();
    } catch (error) {
        return res.status(500).send();
    }
};

export const getOneJob = async (req : Request, res : Response) => { 
    try {
        const id = req.params.id;
        console.log(id);
        const job =  await Job.findById(id);

        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).send();
    }
};

export const updateJob = async (req : Request, res : Response) => { 
    try {
        const id = req.params.id;
        const job = await Job.findByIdAndUpdate(id, req.body)

        return res.status(200).send();
    } catch (error) {
        return res.status(500).send();
    }
};

export const deleteOneJob = async (req : Request, res : Response) => { 
    try {
        const id = req.params.id;
        const job = await Job.findByIdAndDelete(id)

        return res.status(200).send();
    } catch (error) {
        return res.status(500).send();
    }
};

