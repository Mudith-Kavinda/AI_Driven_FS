import { NextFunction, Request, Response } from "express";
const jobs = [
    {
      _id: "xyz",
      title: "Intern - Software Engineer",
      type: "Full-time",
      location: "Remote",
    },
    {
      _id: "abc",
      title: "Software Engineer",
      type: "Full-time",
      location: "Remote",
    },
  ];

export const getJobs = async (req : Request, res : Response) => { //function name = what we want to do eg. get jobs
    try {
        // const jobs = await Job.find().select("title type location")
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).send();
    }
};

export const createJob = async (req : Request, res : Response) => { //function name = what we want to do eg. get jobs
    try {

        // const jobs = await Job.find().select("title type location")
        console.log(req.body);
        jobs.push(req.body)
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).send();
    }
};

export const getOneJob = async (req : Request, res : Response) => { //function name = what we want to do eg. get jobs
    try {
        console.log(req.params.id);
        const id = req.params.id;
        let job = jobs.filter(item => item._id == id);
        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).send();
    }
};
