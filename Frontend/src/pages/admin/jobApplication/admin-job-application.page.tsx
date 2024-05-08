import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import { JobApplication } from "@/types/jobApplication";
import { getJobApplicationById } from "@/lib/services/api/jobApplications";
import { useAuth, useSession } from "@clerk/clerk-react";

function AdminJobApplicationPage() {
  const [jobApplication, setJobApplication] =
    React.useState<JobApplication | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const { applicationId } = useParams();

  const Auth = useAuth();
  const session = useSession();

  React.useEffect(() => {
    if (!applicationId) return;
    const role = session?.session?.user.publicMetadata.role;
    if (role !== "admin") {
      return;
    }

    async function fetchData() {
      try {
        const token = await Auth.getToken();
        const data = await getJobApplicationById(applicationId, token);
        setJobApplication(data as JobApplication);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [applicationId]);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-foreground">
        <CardHeader className="flex-row items-center gap-x-4">
          <CardTitle>{jobApplication?.fullName}</CardTitle>
          <Badge
            className={cn({
              "bg-red-500":
                jobApplication?.rating?.toLocaleLowerCase() === "bad",
              "bg-orange-400":
                jobApplication?.rating?.toLocaleLowerCase() === "moderate",
              "bg-teal-500":
                jobApplication?.rating?.toLocaleLowerCase() === "good",
            })}
          >
            {jobApplication?.rating}
          </Badge>
        </CardHeader>
      </Card>

      <Card className="p-4">
        {jobApplication!.answers?.map((answer, i) => {
          return <p key={i}>{answer}</p>;
        })}
      </Card>
      <div>
        <Button variant="link" asChild>
          <Link to={"/admin/jobs"}>Back</Link>
        </Button>
      </div>
    </div>
  );
}

export default AdminJobApplicationPage;
