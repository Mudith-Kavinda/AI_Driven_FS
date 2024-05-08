import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import JobApplicationCard from "./components/JobApplicationCard";
import { useParams } from "react-router-dom";
import React from "react";
import { Job } from "@/types/job";
import { JobApplication } from "@/types/jobApplication";
import { getJobById } from "@/lib/services/api/jobs";
import { getJobApplicationsForJob } from "@/lib/services/api/jobApplications";
import { useAuth, useSession } from "@clerk/clerk-react";

function JobPage() {
  const [job, setJob] = React.useState<Job | null>(null);
  const [isJobLoading, setIsJobLoading] = React.useState(true);
  const [jobApplications, setJobApplications] = React.useState<
    Array<JobApplication>
  >([]);
  const [isJobApplicationsLoading, setIsJobApplicationsLoading] =
    React.useState(true);
  const { id } = useParams();
  const auth = useAuth();
  const session = useSession();

  React.useEffect(() => {
    const role = session?.session?.user.publicMetadata.role;
    if (!id) {
      return;
    }

    if (role !== "admin") {
      return;
    }
    async function fetchData() {
      try {
        const token = await auth.getToken();
        const data = await getJobById(id, token);
        setJob(data as Job);
        setIsJobLoading(false);

        const jobApplicationsData = await getJobApplicationsForJob(id, token);
        setJobApplications(jobApplicationsData);
        setIsJobApplicationsLoading(false);
      } catch (error) {
        console.log(error);
        setIsJobLoading(false);
        setIsJobApplicationsLoading(false);
      }
    }

    fetchData();
  }, [id, auth]);

  if (isJobLoading || isJobApplicationsLoading) {
    return null;
  }

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
              jobId={id!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
