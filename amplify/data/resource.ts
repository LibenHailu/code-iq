import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
// import { postConfirmation } from "../auth/post-confirmation/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Course: a
  .model({
    title: a.string().required(),
    activeCourse: a.hasOne("ActiveCourse", "courseId"),
    questions: a.hasMany("Question", "courseId"),
    })
  .authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    // allow.group("Admins"),
  ]),
  UserProfile: a.model({
    email: a.string(),
    profileOwner: a.string(),
    activeCourse: a.hasOne("ActiveCourse", "userEmail"),
    userAnswer: a.hasMany("UserAnswer", "userEmail"),
    userScore: a.hasOne("UserScore", "userEmail"),
  }).authorization((allow) => [
    allow.ownerDefinedIn("profileOwner"),
  ]),
  ActiveCourse: a.model({
    courseId: a.id(),
    course: a.belongsTo("Course", "courseId"),
    userEmail: a.string(),
    user: a.belongsTo("UserProfile", "userEmail"),
  }).secondaryIndexes((index) => [index("courseId"), index("userEmail")])
  .authorization((allow) => [
    allow.owner(),
    allow.publicApiKey(),
    // allow.group("Admins"),
  ]),
  Question: a.model({
    description: a.string().required(),
    choiceA: a.string().required(),
    choiceB: a.string().required(),
    choiceC: a.string().required(),
    choiceD: a.string().required(),
    correctAnswer: a.string().required(),
    explanation: a.string().required(),
    userAnswer: a.hasMany("UserAnswer", "questionId"),
    courseId: a.id().required(),
    course: a.belongsTo("Course", "courseId"),
  }).secondaryIndexes((index) => [index("courseId")]).authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    // allow.group("Admins"),
  ]),
  UserAnswer: a.model({
    correctAnswer: a.string(),
    userAnswer: a.string(),
    questionId: a.id(),
    question: a.belongsTo("Question", "questionId"),
    userEmail: a.string(),
    user: a.belongsTo("UserProfile", "userEmail"),
  }).secondaryIndexes((index) => [index("questionId"), index("userEmail")])
  .authorization((allow) => [
    allow.owner(),
    // allow.group("Admins"),
  ]),
  UserScore: a.model({
    userEmail: a.string().required(),
    user: a.belongsTo("UserProfile", "userEmail"),
    score: a.integer().required(),
  }).secondaryIndexes((index) => [index("userEmail")])
  .authorization((allow) => [
    allow.owner(),
    // allow.group("Admins"),
  ]),
  
  // CourseImage: a
  // .model({
  //   s3Key: a.string(),
  //   alt: a.string(),
  //   courseId: a.id(),
  //   course: a.belongsTo("Course", "courseId"),
  // })
  // .secondaryIndexes((index) => [index("courseId")])
  // .authorization((allow) => [
  //   allow.authenticated(),
  // ]),

})
// .authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
