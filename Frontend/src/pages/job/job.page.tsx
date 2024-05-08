import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin } from "lucide-react";
import { Job } from "@/types/job";
import { useUser } from "@clerk/clerk-react";
import { getJobById } from "@/lib/services/api/jobs";
import { createJobApplication } from "@/lib/services/api/jobApplications";
import { useAuth } from "@clerk/clerk-react";

function JobPage() {
  const [job, setJob] = React.useState<Job | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  const { id } = useParams(); //Gives us the value of the route param.
  const auth = useAuth();

  const [formData, setFormData] = React.useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  React.useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    if (!id) return;

    async function fetchData() {
      try {
        const token = await auth.getToken();
        const data = await getJobById(id, token);
        setJob(data as Job);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    // getJobById(id).then((data) => {
    //   setJob(data);
    //   setIsLoading(false);
    // });
    fetchData();
  }, [id, isLoaded, isSignedIn, navigate]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setFormData({ ...formData, [event.target.name]: event.target.value }); //Controlled Component Pattern
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!id) return;
    const token = await auth.getToken();
    await createJobApplication(
      {
        userId: user.id,
        fullName: formData.fullName,
        job: id,
        answers: [formData.a1, formData.a2, formData.a3],
      },
      token
    );
  };

  if (isLoading || job === null) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
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
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />

      <form className="py-8" onSubmit={handleSubmit}>
        <div>
          <h3>Full Name</h3>
          <Input
            className="mt-2"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {job.questions.map((question, i) => {
          return (
            <div key={i} className="mt-4">
              <h3>{question}</h3>
              <Textarea
                className="mt-2"
                name={`a${i + 1}`}
                required
                onChange={handleChange}
              />
            </div>
          );
        })}

        <Button type="submit" className="mt-8 bg-card text-card-foreground">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default JobPage;
