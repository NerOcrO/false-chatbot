# False chatbot

## Install

### NPM

* npm install

### MongoDB

* use yelda
* db.createCollection('chatbot')

## How to use

> npm run dev

Fill the form then go to:
> <http://localhost:8080/user/{id}>

Example:

```json
[
  "bntOVQQ7btXaPHCL1B891A",
  "bntOVQQ7btXaPHCL1B891A",
  "gBU23EeWMzievyzErPi8gQ",
  "ZsaIYxCvPLGV2ZoBeyjw5w"
]
```

Or go to:
> <http://localhost:8080/thread/{id}>

Example:

```json
[
  {"userMessage":"test1","botResponse":"I hate everything."},
  {"userMessage":"test2","botResponse":"Turkey can never beat cow."},
  {"userMessage":"test3","botResponse":"One rage every three months is permitted. Try not to hurt anyone who doesn't deserve it."}
]
```

## Develop a REST webservice based on Hapi

* Create root endpoint that will serve a default html page with a simple form having 2 fields, userId and message, + an image, a css file and one or more js files. On submission, it should POST the 2 input to the bellow endpoint
* Create a POST endpoint that will save the content of the form (userId, message) in a Mongo database, and return an object {userID:xxx, userMessage:yyy, botResponse:zzzz, threadId:oooo}, "userID" being the userID sent, "userMessage" the message sent, "response" being a random text of your choice taken from an a random public API (<https://github.com/toddmotto/public-apis>) and threadId being the id of the current conversation. A new thread should be created after 15min of inactivity for a given user
* Create a GET endpoint with idUser as a param and return an array of threadId.
* Create a GET endpoint with idThread as a param and and return the threadcontent (user messages and bot responses)

You don't have to deploy your project online, but please make sure to provide basic info in a README.

## Objectives

* Evaluate your ability to test a new backend framework like Hapi and use it to serve basic static file as well as developing a simple REST webservice
* Use of mongo : thinking to data to be stored and how to organize it in Mongodb (defining schema + use)
* Evaluate your capacity to use Promise (or async / await) with a DB connection and an external API

## Notes

* I won't evaluate the quality of the frontend, excepting if you really want to do something special to showoff ;). Ugly 1990 HTML is fine too me. I am asking you to add an image + external scripts to see how you'll handle multiple static files with Hapi
* GET endpoints : no need to develop the UI, just give the required info in a README to call thoose 2 endpoints
