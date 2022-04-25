# Sleep score

Welcome dear internet user, it's great to have you here. You will find the instructions to run every part of the app in the following lines.

## Front end

I am using vite.js for the sake of faster builds, to make development easier thatn create react app, or even rollup configs or webpack configs.

The frontend stack it is based on:

- React / TypeScript
- GraphQL / Apollo (to do CRUD requests)
- CSS modules
- Jest / @testing-library/react
- Hooks (to make our lives easier)

### React design patterns

I am using one of my favorite React design patterns, which is the compound component pattern, along with hooks, that makes the component development easier.

Using a custom context and a custom forward ref, to share the HTML props for every component.

### Instructions

Here are the instructions to do actions like: install, test, and start.

#### Install

In your favorite terminal, go to `cd/client` folder and then do an:

`npm install` or `yarn install`

This script will install all the necessary dependencies for the project.

#### Test

In your favorite terminal, go to `cd/client` folder and then do an:

`npm run test` or `yarn test`

This script will run the test runner and will test all the component that has a test.

#### Start

In your favorite terminal, go to `cd/client` folder and then do an:

`npm run dev` or `yarn dev`

This script will start the project and you are going to be able to view the app in the `http://localhost:3000`

### Notes

At the beginning of the application, you can see the home page where you can do the sleep calculation, selecting 1 specific time from each dropdown, after this the button that does the calculation will be enabled, and you can do the calculation.

The calculation will be displayed at the bottom of the helper text, in a bordered card.

#### Navigation

You can navigate to different pages, these are the available pages, and what you can see in each of them.

`/`: this is the home page, and you will see all the app logic to do the sleep calculation.

`/activity`: in this route you will see all the activity created, in range of 6 cards.

`/activity/:id`: this route it is valid when you click on a card in the previous route, and you will see the information for the respective id, also you will be able to go to the update page, or delete the activity.

`/activity/update:id`: this route it is reponsible to render the same logic as the home, but you will receive the data from the activity id, and you are going to be able to update it with different criteria.

### Api

I've deployed the api to a heroku server, so the frontend will do any query or mutation to: [https://sleep-score.herokuapp.com/graphql](https://sleep-score.herokuapp.com/graphql)
