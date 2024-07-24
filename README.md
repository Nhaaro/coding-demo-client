# Coding Demo

This repo holds the client/front-end side of a coding demo SPA built with React + TypeScript, it was created with Vite's React + TypeScript template

The following functionalities are currently implemented

- User Module (CRUD)
  - View of all the users in the app (table)
  - Single page for each user
  - User form for user creation and modification
  - User deletion
- News Module
  - Grid view of all the news articles
  - Single page view for each article

This application currently supports the following languages

- English
- Spanish

## Libraries

- `react-router-dom` - Navigation
- `@mui/material` - UI Components
- `i18next` - Internalization
- `html-react-parser` - Parsing news article content

## How to run

As this is a Vite project, all you need to do is run

```bash
npm install
npm run dev
```

Make sure you have node v22.x.x and npm v10.x.x installed

## TODO

- Connect with server/back-end
  - User Module will include more fields stored in a SQL database (AWS RDS) accessible through a REST API
  - News Module articles will be stored in a NoSQL database (AWS DynamoDB) accessible through a GraphQL endpoint
- Add different users with different permission levels (admin, user, developer, etc.)
- Handle password change and reset
- Implement file uploading to allow users to change their profile picture
- Add form validation with [joi](https://joi.dev/)
- Create a branch that does not rely on Material UI components
- Add HMR for the re-generation of `@types/resources.d.ts` everytime a new key is added to the localization files
- Add e2e testing with Cypress
- Add CI/CD GitHub Actions to deploy to an AWS s3 bucket
