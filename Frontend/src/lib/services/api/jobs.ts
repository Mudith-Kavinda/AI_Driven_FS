import { Job } from "@/types/job";
import { useAuth } from "@clerk/clerk-react";

export const getJobs = async () => {
  const res = await fetch(
    "http://localhost:8000/jobs",
    {
      method: "GET",
    }
  );
  const data: Job[] = await res.json();
  return data;
};

export const getJobById = async (id: string | null | undefined, token : string | null | undefined) => {
  // const { getToken } = useAuth();

  const res = await fetch(
    `http://localhost:8000/jobs/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: Job = await res.json();
  return data;
};

export const createJob = async ({
  title,
  description,
  type,
  location,
  questions,
}: {
  title: string;
  description: string;
  type: string;
  location: string;
  questions: string[];
}) => {
  const { getToken } = useAuth();

  await fetch("http://localhost:8000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getToken()}`,
    },
    body: JSON.stringify({
      title,
      description,
      type,
      location,
      questions,
    }),
  });
};