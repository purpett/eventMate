# eventMate
## Built by *The Full Stack Squad*

## Description

EventMate is a dynamic MERN (MongoDB, Express, React, Node) stack web app that has been developed as the third project of General Assembly’s Software Engineering Immersive program. As an event management platform with some social media features, it allows registered users to perform CRUD operations on events and comments. Users can also join an event and see upcoming and past events on their profile. Passport authentication ensures secure access to comment threads and restricts content visibility for unregistered users.

## Deployment Link

Deployment link for demo: [eventmate.netlify.app/](https://eventmate.netlify.app/)

## Code Installation

Copy the snippets of code below and paste them in your terminal:

`$ git clone https://github.com/purpett/eventMate`

`$ npm install` or `$ yarn install`

You will need to have both the backend and frontend servers running. 

For the frontend, cd into the frontend directory, then run `$ npm start`. Then go to `localhost: 3000` in your browser if it doesn’t open by itself. 

For the backend, install Nodemon by running `$ npm install nodemon`. In another terminal tab, cd into the backend directory and run `$ nodemon`. 

You should be good to go!


## Timeframe & Working Team

This project was built as a group of four. We were given little over a week to complete it. I worked with [Catherine Nevin](https://github.com/Catherinen29), [Cezary Karwoski-Budd](https://github.com/K-B13), and [Miles Morris](https://github.com/mmorris26). 

## Technologies

* Framework and Libraries
    * React
    * React Router
    * Passport
    * Mongoose
    * Dotenv
* Languages
    * HTML
    * CSS
    * JavaScript
    * JSX (JavaScript XML)
    * Express 
* Database
    * MongoDB
* Code version control
    * Git: Local machine tool that tracks changes in the application.
    * GitHub: Online service for hosting repositories that uses Git.
* Code and debugging
    * Command line
    * Visual Studio Code: code editor
    * Google Chrome Developer Tools
    * Postman
    * Nodemon
    * Node.js
    * Npm 
* Design
    * [Excalidraw](https://excalidraw.com)
* Project Management:
    * Google Docs for team expectations
    * [Trello](https://trello.com/): Task assigning and monitoring
* Deployment
    * Netlify: for the frontend part of the project.
    * Heroku: for the backend side of the project.
* Media:
    * [Pictogrammers - Material Design Icons](https://pictogrammers.com/library/mdi/): used for icons.

## Brief

### Team requirements
* Contribute equally.
* Have a solid understanding of the entire project (even the features implemented by other team members).
* Take time to pair-program with teammates to reinforce learning.
* Be prepared to explain sections of code that were written by teammates.

### Client (Front End) Requirements
* Have a working, interactive React app, built using `npx create-react-app client`.
* Have at least 6 separate, rendered components in an organised and understandable React file structure.
* Use only React for DOM Manipulation.
* Consume data from your API, and render that data in your components.
* Utilise React Router, for client-side routing.
* Authentication.

### Server (Back End) Requirements
* Have generic working router actions for CRUD using Express, Mongoose, and MongoDB.
* Have at least 2 models (more if it makes sense).
* Have full CRUD on at least one of your models.
* Be able to Add/Delete on any remaining models (if it makes sense).
* Authentication.

### Styling Requirements
* Be styled with CSS.
* Use flexbox (display: flex) or CSS Grid.
* Implement responsive design on 2 screen sizes (including desktop) using a media query (mobile).
* You can use a CSS framework if you want to.

### Linting
* Indent properly.
* Utilise high-quality, semantic variable names and follow naming conventions.
* Remove unnecessary boilerplate React files and code.
* Remove all console.log()s and commented-out code (functional notes/comments are okay).

### Deployment requirements
* Deploy the fully functional front-end via Netlify, GitHub Pages or Vercel.
* Deploy the back-end via Heroku (or Vercel).
* Deploy the MongoDB database on MongoDB Atlas.

### Procedural Requirements
* Have frequent commits from every team member dating back to the very beginning of the project. These commits should total to or exceed 50.
* Commit often and use meaningful commit messages.
* Use effective and safe branching and merging processes.
* Every team member must have commits contributing to the project.
* Pair programming is allowed and should be noted in the commit by using @github_username of each developer pairing.
* No single developer should do a majority of the commits.
* Document your code well.

## Planning

1. Choosing a team name: **_The Full Stack Squad_**. 
2. We set up the team expectations, outlining our respective strengths and improvement opportunities. 
3. We had a live session on Excalidraw to draft: 
    * Wireframes

        ![eventmate wireframes](/readMe-media/wireframes.gif)

    * User stories

        ![user stories](/readMe-media/user-stories.png)

    * Component hierarchy

        ![component hierarchy](/readMe-media/component-hierarchy.png)

    * Data flow

        ![data flow](/readMe-media/data-flow.png)

    * Database schema

        ![database-schema](/readMe-media/schema.png)

4. We set up a Trello board as a project management tool to track task progress. 

    ![trello board](/readMe-media/trello.png)

5. We decided to work on the backend first, as a group and pair-programming. Then on the frontend, as a group, in pair-programming, and individually, depending on our respective strengths. We made decisions about the file structure of our projects to better organise our work. 
6. The last few days of the project were for bug squashing, adding CSS, responsiveness, and improving UX to the maximum. We also decided to work on some last minute extra features with our remaining time.

## Code Process

* I was in charge of coding RESTful API calls for the comments. The Read operation is implicit as the comments are embedded in the Event model. 
    * The `createComment` function handles the creation of a new comment for a specific event. It sends a POST request to the API endpoint, including the event ID and the new comment details. 

        ![createComment api](/readMe-media/create-comment-api-call.png)

    * The `deleteComment` function is responsible for deleting a comment by sending a DELETE request to the corresponding API endpoint with the event and comment ID.

        ![deleteComment api](/readMe-media/delete-comment-api-call.png)

    * The `updateComment` function updates an existing comment by sending a PUT request to the API endpoint, including the event and comment ID along with the updated comment data.

        ![updateComment api](/readMe-media/update-comment-api-call.png)

* The `addUserIdToAttendees` function adds the user's ID to the event's attendees array when the "Attend" button is clicked. It checks if the user is already attending by verifying if their ID is in the attendees array. If not, the user's ID is added to a new attendees array, which replaces the current one. This updated event data is then sent to the backend for storage.

    ![add user id to attendees function](/readMe-media/addUserIdToEvents.png)

* The `findEventsByUserId` function retrieves all events associated with the logged-in user's ID. It extracts the user's ID from the authentication token and calls the `getAllEventsWithUserId` function, which sends a request to the API endpoint to fetch the events. The response is then parsed from JSON, and the user's events are stored in the state variable `userEvents`.

    ![find events by user id](/readMe-media/findEventsByUserFunction.png)

* I have worked on most of the CRUD operations for comments:
    * The `updateOneComment` function updates a comment by sending a PUT request to the API endpoint with the event and comment ID along with the edited comment data. 
    * The `deleteOneComment` function deletes a comment by sending a DELETE request to the API endpoint with the event and comment ID. 
    * The `handleInputOnChange` function updates the `editedComment` state when the input field value changes. 

    ![comments CRUD](/readMe-media/comment-crud.png)

* I have added a few functions to improve UX regarding comment forms:
    * The handleEscForm function closes the comment update form when the escape key is pressed. 
    * The handleBlur function also closes the form when the user clicks outside of it. 
    * Lastly, the toggleForm function toggles the visibility of the comment update form and initialises the editedComment state with the existing comment text.

    ![functions for UX](/readMe-media/improve-ux-functions.png)

* I coded the `upcomingOrPastEvents` function to categorise events as upcoming or past. It takes an array of events as input and compares each event's date with the current date. The events that occur after the current date are considered upcoming, while the events that have already occurred are categorised as past. The function returns an object containing the arrays of upcoming and past events for further processing and display.

    ![function that divides event between upcoming or past](/readMe-media/sort-user-events.png)

* I improved the event editing and updating functionality by modifying the promise's return structure. The `getEvent` function retrieves a specific event by its ID, updating the `singleEvent` state and checking the user's attendance status. With the `updateOneEvent` function, the event is updated using a PUT request, and the `singleEvent` state is refreshed with the updated data. Both functions use API calls to get the information. 

    ![get event function](/readMe-media/get-event.png)

    ![update event function](/readMe-media/update-event.png)

* I worked on putting the most attended event at the top of the homepage. To achieve this, I updated the API endpoint to retrieve all events, which are then sorted in descending order based on the number of attendees. 

    ![all events api endpoint](/readMe-media/get-events-api.png)

* I am particularly proud of the CSS, UX, and responsiveness, of which I was in charge. 

## Challenges

* Working on a team for the first time had its challenges: getting everyone to agree on certain approaches, dividing tasks, time management, debugging other people’s code. 
* Pull requests were quite challenging too. We had one person in the group as the Code Owner on GitHub, so he was in charge of reviewing all the PRs. Although we mostly approved the PRs together as a group through Zoom screen sharing, it took quite some time. 
* Merge conflicts: after pull requests, we had some merge conflicts a few times. They were quite confusing, but we handled most of them in a team, having 4 sets of eyes on the problem. 
* Using Passport for authentication might have been one of the biggest challenges. 

## Wins

* I managed to build some last minute features that work perfectly, like “unattending”, showing the most attended event. 
* Sorting events by attendee count and adding attendees to an event. This took some lateral thinking, but eventually made it work!
* I am happy that we managed to work seamlessly together. There has been great collaboration, communication, and clarity among teammates. Pair-programming and group programming/debugging was a breeze. 

## Key learnings

* Teamwork is easier and harder than expected at the same time. 
* I now understand how to fix merge conflicts on VSCode and GitHub. 
* Adaptability is necessary to work in a team. 
* I learned some more advanced MongoDB queries.
* I used Express to build APIs in the backend, which was completely new to me. 
* I have had to use several technologies that I encountered for the first time just before the project, and now have more knowledge about them. 

## Future Improvements

* Improve the styling. 
* Add tags to events, and to user interests.
* Allow users to save an event (e.g., star, favourite).
* Implement more social media features, like allowing users to follow other users.
* More customisation of the profile page, e.g., uploading a profile picture, adding a bio, etc.
* Limit the number of password input attempts. 
