import { JobApplication } from "@/types/jobApplication";
import { useAuth } from "@clerk/clerk-react";

export const getJobApplicationsForJob = async (id: string | null | undefined, token : string | null | undefined) => {
  // const { getToken } = useAuth();

  const res = await fetch(
    `http://localhost:8000/jobApplications?jobId=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: JobApplication[] = await res.json();
  return data;
};

export const getJobApplicationById = async (id: string) => {
  const { getToken } = useAuth();

  const res = await fetch(
    `http://localhost:8000/jobApplications/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );
  const data: JobApplication = await res.json();
  return data;
};

export const createJobApplication = async ({
  userId,
  fullName,
  job,
  answers,
}: {
  userId: string;
  fullName: string;
  job: string;
  answers: string[];
}) => {
  const { getToken } = useAuth();  

  await fetch(
    "http://localhost:8000/jobApplications/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        userId: userId,
        fullName: fullName,
        job,
        answers,
      }),
    }
  );
};