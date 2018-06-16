# False chatbot

![node version](https://img.shields.io/badge/node-&#10878;8-green.svg)
![ISC license](https://img.shields.io/badge/licence-ISC-blue.svg)

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
