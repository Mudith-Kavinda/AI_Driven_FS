import JobCard from "@/components/shared/JobCard";
import { getJobs } from "@/lib/services/api/jobs";
import { Job } from "@/types/job";
import React from "react";

function JobSection() {
  const [jobs, setJobs] = React.useState<Job[]>([]);

  React.useEffect(() => {
    getJobs().then((data) => setJobs(data));
  }, []);

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              _id={job._id}
              isAdmin={false}
            />
          );
        })}
      </div>
    </section>
  );
}

export default JobSection;
