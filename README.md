Description.
This project was designed to be an employee recruitment website. It is built using MERN stack. I have integrated OpenAI’s Large Language Model into this project. The model has been trained to give predictive answers to questions depending on the job vacancy. For the frontend, I have used the Vite build tool to create a react build, and for styling, I have used Tailwind CSS along with the Shadcn utility library. For the routing part, I have used React Router. I have added authentication by using Clerk authentication. 

How to run the Project.
To run the project, clone the repository and run npm Install to install all the node modules in the backend. Some Environmental Variables have to be added; I will list them below. After adding the ENV’s (OpenAI key is optional) run the project using “npm run dev” for both the backend and frontend. 

ENV’ for the Frontend:
1.	VITE_CLERK_PUBLISHABLE_KEY – this is a public key provided by Clerk Authentication.
   
ENV’s for the Backend:
1.	MONGODB_DATABASE – This is a private key provided by MongoDB Atlas.
2.	CLERK_SECRET_KEY - this is a private key provided by Clerk Authentication.
3.	OPENAI_API_KEY - this is a private key provided by OpenAI to access their LLM (In this case, along with the data set I have trained).
4.	PORT – This is your preferred port number. 

