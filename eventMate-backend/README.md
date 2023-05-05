# eventMate
# Created by *The Full Stack Squad*
SEI Project 3 - Event Management App

Link to Trello Board - https://trello.com/b/oGbblHkd/project-3-tasks-%F0%9F%92%AA%F0%9F%8F%BB

## About eventMate
MVP
* eventMate is a full stack web application for discovering events and saying if you are attending.
* eventMate has some features of popular Social Media websites and users can see which other users are attending events.
* Users will have their own profile where they can view upcoming and past events as well as leaving and viewing comments on events.
* Logged in users will be able to leave their own comments, create events and manage their own profile.
* Unregistered users will have limited access to the app and will only be able to see information about events themselves such as the description and location.

## Wireframes

![eventmate wireframes](https://user-images.githubusercontent.com/126505751/236216986-a70cb335-c768-4601-9244-0be826e333d4.gif)

Excalidraw Link can be found here https://excalidraw.com/#room=611b02b78e961aedf070,TQcjd_mak94UCROWp1RbpQ


## Schema

<img width="966" alt="image" src="https://user-images.githubusercontent.com/126505751/236213798-cffa7b77-30d5-4de9-82c6-eb24754ec794.png">

## Data Flow

<img width="621" alt="image" src="https://user-images.githubusercontent.com/126505751/236214516-01907236-3d78-48b8-9026-0a76c76ba39e.png">

## User Stories

* AAU, I want to see a list of upcoming events
* AAU, I want to see details about an events
* AAU, I want to be able to view different amounts of event information
based on if I'm logged in or not
* AAU, I want to be able to sign up and log in
* AAU, I want to be able to delete my account
* AAU, I want to have a personal profile page
* AAU, I want to access my upcoming events and past events
* AAU, I want to be able to confirm if I am attending an event
* AAU, I want to like an event
* AAU, I want to be able to leave a comment on an event
* AAU, I want to be able to delete a comment I have made
* AAU, I want to create an event with specific details
* AAU, I want to be able to update an event I have created
* AAU, I want to see which other users are attending an event
* As An App Owner, I want to prevent users not logged in from 
liking, commenting, creating or confirming if they are attending events

## Component Hieracy
```
 App.js
      Home
       Events
            Single Event
               Comments
                    Create Comments
                    (Comment)
        Create Event
    Profile
        Single Event
        Upcoming Events
        Past Events
    Login
    Sign In
```



