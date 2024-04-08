import JobCard from "@/components/shared/JobCard";

function JobSection() {
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

  return (
    <section>
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => (
          <JobCard key={job._id} {...job} isAdmin={false} />
        ))}
      </div>
    </section>
  );
}

export default JobSection;
