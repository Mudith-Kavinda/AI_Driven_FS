import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import JobApplicationCard from "./components/JobApplicationCard";
import { useParams } from "react-router-dom";
import React from "react";
import { Job } from "@/types/job";
import { JobApplication } from "@/types/jobApplication";

function JobPage() {
  const { id } = useParams();
  const [job, setJob] = React.useState<Job | null>(null);
  const [jobApplications, setJobApplications] = React.useState<
    JobApplication[]
  >([]);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    const getJobById = async () => {
      const res = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: "GET",
      });
      const data: Job = await res.json();
      return data;
    };

    const getApplicationForJob = async () => {
      const res = await fetch("http://localhost:8000/jobApplications/", {
        method: "GET",
      });
      const data: JobApplication[] = await res.json();
      return data;
    };

    getJobById()
      .then((data) => setJob(data))
      .catch((err) => {
        console.log(err);
      });

    getApplicationForJob()
      .then((data) => {
        const relevantApplications = data.filter(
          (application) => application.job._id == id
        );
        setJobApplications(relevantApplications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
        {/* <div className="gap-x-4 flex items-center mt-4">
          <Badge>NodeJS</Badge>
          <Badge>ReactJS</Badge>
          <Badge>AWS</Badge>
        </div> */}
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={application.job._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
