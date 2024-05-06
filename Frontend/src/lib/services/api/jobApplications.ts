import { JobApplication } from "@/types/jobApplication";

export const getJobApplicationsForJob = async (id: string) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(
    `https://aidf-back-end-production.up.railway.app/jobApplications?jobId=${id}`,
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
  const token = await window.Clerk.session.getToken();

  const res = await fetch(
    `http://localhost:8000/jobApplications/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = await window.Clerk.session.getToken();

  await fetch(
    "http://localhost:8000/jobApplications/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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