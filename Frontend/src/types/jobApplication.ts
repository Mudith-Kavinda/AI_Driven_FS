export type JobApplication = {
    _id: string,
    userId: string;
    fullName: string;
    job: {
      _id: string;
      title: string;
      description: string;
      type: string;
      location: string;
      questions: string[];
    };
    answers: string[],
    rating: string;
  };
  