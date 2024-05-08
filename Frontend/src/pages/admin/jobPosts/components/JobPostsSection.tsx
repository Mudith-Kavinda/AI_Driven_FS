import React from "react";
import JobCard from "@/components/shared/JobCard";
import { Job } from "@/types/job";
import { getJobs } from "@/lib/services/api/jobs";

function JobPostsSection() {
  const [jobs, setJobs] = React.useState<Job[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobs();
        setJobs(data as Job[]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="py-8">
      <h2>Current Job Postings</h2>
      <div className="mt-4 flex flex-col gap-y-4">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              _id={job._id}
              isAdmin={true}
            />
          );
        })}
      </div>
    </section>
  );
}

export default JobPostsSection;
