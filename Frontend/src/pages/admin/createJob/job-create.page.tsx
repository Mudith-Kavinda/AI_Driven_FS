import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/lib/services/api/jobs";
import React, { ChangeEvent, FormEvent } from "react";

function JobCreatePage() {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    type: "",
    location: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createJob({
      title: formData.title,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      questions: [formData.q1, formData.q2, formData.q3],
    });
  };

  return (
    <div>
      <div className="py-8">
        <h2>Create A Job Posting</h2>
      </div>
      <form className="py-8" onSubmit={handleSubmit}>
        <div>
          <h3>Title</h3>
          <Input
            className="mt-2"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Description</h3>
          <Textarea
            className="mt-2"
            name={"description"}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Type</h3>
          <Input
            className="mt-2"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Location</h3>
          <Input
            className="mt-2"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Question 1</h3>
          <Textarea
            className="mt-2"
            name={"q1"}
            value={formData.q1}
            onChange={handleChange}
            defaultValue={
              "Share your academic background and highlight key programming concepts you've mastered. How has your education shaped your current tech skill set?"
            }
          />
        </div>
        <div className="mt-4">
          <h3>Question 2</h3>
          <Textarea
            className="mt-2"
            name={"q2"}
            value={formData.q2}
            onChange={handleChange}
            defaultValue={
              "Describe your professional development, emphasizing any certifications obtained. How have these certifications enriched your technical abilities, and can you provide an example of their practical application?"
            }
          />
        </div>
        <div className="mt-4">
          <h3>Question 3</h3>
          <Textarea
            className="mt-2"
            name={"q3"}
            value={formData.q3}
            onChange={handleChange}
            defaultValue={
              "Discuss notable projects in your programming experience. What challenges did you face, and how did you apply your skills to overcome them? Highlight the technologies used and the impact of these projects on your overall growth as a prefessional?"
            }
          />
        </div>

        <Button type="submit" className="mt-8 bg-card text-card-foreground">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default JobCreatePage;
