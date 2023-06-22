# **Lithium Full Stack Engineer Tech Test**

This is a tech test for the role of full stack engineer at Lithium. We are somewhat tech agnostic, so feel free to use the tools, frameworks and packages you like. Although we are quite flexible in our tech choices, the language **must** be TypeScript for both the front end and back end, and the front end must be either React or NextJS (or a similar React-based meta-framework). At the end of the test you will be asked to explain your choices. 

## The Task

Lithium are expanding our system, and would like a portal for users to log in to. Before they log in though, they will need to be able to create an account. You will therefore need to create a back end to handle account creation and logging in, and the front end to enable them to create an account and log in. Once logged in, you just need to display "Hey `(user's full name)`!"

**Submission**

To start the test, please make an empty repo on your own personal GitHub with this readme file in the route directory and begin building the full stack app outlined above. Pushing at different intervals in the test will help us get an idea into your process, so please aim to do this. Don't feel pressure though - at Lithium we value speed, but understand this test will need to be undertaken in your own time and around other commitments, so rest assured the time, duration and frequency of these pushes **will not** be taken into consideration. That said, we will expect your submission to be completed no later than 5 days after receiving it.  

**What we're looking for**

This role will involve a fair level of independence - the right candidate will be able to own a feature from start to finish. This is why the choices of tech are left fairly open - we want to see you use your intuition and how you approach a problem. 

This is a full stack role, so please aim to make your submissions look *decent*. That being said, this is not a design job that you are applying for, so don't spend too long making it as beautiful as it can be - just try and use our current site's branding as a guideline and have your submission feel like it belongs. 

## When you've finished coding

After you have completed the task, please send us a .zip file of the repo, but fill in the section below, keeping this file in the root directory:

**Your name**

`John Canlas`

**Why did you choose the tech you did?**

For this project, I have chosen TypeScript as programming language due to its strong typing and increased type-safety, which allows for easier code maintenance and early detection of errors. For the frontend, I have used React.js, a popular and efficient library that allows for modularized components and reusable code. I opted for MUI as styling framework because it offers a wide range of customizable and pre-made components that speed up development time. To manage the application state, I utilized Redux, which provides a centralized store for managing data and actions in a predictable and scalable way.

Moving on to the backend, we chose Node.js and Express.js for their performance and easy scalability in building APIs. For database management, I turned to Prisma, a modern ORM that simplifies database schema creation and provides a type-safe query builder. To integrate the backend with the frontend, I utilized GraphQL, a powerful and flexible API layer that provides a single endpoint for querying and manipulating data.

To allow users to easily authenticate, I implemented Google Auth Library, providing a seamless sign-in and sign-up experience while maintaining security practices. Finally, I used Axios for third-party integration, allowing us to make HTTP requests to other services. Overall, these technologies were thoughtfully chosen to optimize functionality, scalability, and maintainability of the application.

**Guide to start the App**

1. Development environment: Node v18.16.0.
2. Create .env files in both the client and server directories based on the .env.example files.
3. In the root directory, run the command **npm install**.
4. Start a MySQL server at port 3306 and create a database named "lithium".
5. In the server directory, run the following commands: **npx prisma generate** and **npx prisma db push**.
6. After installation, run the command **npm start**.
7. You can access the app at http://localhost:3000.