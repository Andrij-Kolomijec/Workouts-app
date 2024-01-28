# Workout-app

[:arrow_forward: visit here](https://workouts-app-l5k0.onrender.com)
(Loading from a server may take several minutes.)

![Image Alt text](https://raw.githubusercontent.com/Andrij-Kolomijec/Workouts-app/main/Images/preview1.png)
![Image Alt text](https://raw.githubusercontent.com/Andrij-Kolomijec/Workouts-app/main/Images/preview2.png)

## MERN project

- JavaScript (React)
- Node.js (Express)
- MongoDB (Mongoose)

## Authentication

### validator

- password and email validation during creation

### bcrypt

- creating salt
- hashing passwords
- password validation on login

### JSON Web Tokens

- managing authentication between client and server
- after successful log in / sign up request
  1. server creates token (JWT)
  2. sends back the JWT to the client (browser) so it can be accessed there => pressence or absense of JWT allows to conditionally show pages
  3. restricting access to server APIs - passing the JWT from client to server API as parts of request headers
- the security is achieved using secret string of characters known only to the server and hashing that string with header and payload -> the result is unique signature
- **backend**
  - model has static methods for validating, encrypting, comparing passwords which are used in the controller
  - sign up: controller creates a token (secret string in .env) with expiration date and passes the JWT as a response object
  - log in: compares email and password from request body, then creates a JWT for the user and returns json response with email and JWT
  - API routes are protected with middleware that checks if the request comes in with a loaded and valid JWT for that user
  - if user is not logged in -> do not send the request - add an authorization header to fetch request (Home.js, WorkoutForm.js, WorkoutDetails.js)
  - add user.id property for every workout so every user has unique items
- **frontend**
  - React context is used to store global state of user being logged in (with useReducer hook and custom hooks, that check if the hook is inside the scope of the context)
  - sign up / log in custom hooks:
    - have error and isLoading states, dispatch function from context
    - connect to the login/signup APIs using post method and passing stringified json of email and password in the fetch request body
    - then to get the response = 'response.json() -> if response.ok:
      1. store JWT (and email property => so the whole json object) in the browser's local storage to maintain loged in status
      2. update context with dispatch function
      3. set loading state
    - hooks return login/signup function, loading state, error state
  - log out only deletes local storage and updates global state (dispatch function)
  - check local storage to set the initial state (if logged in or not) in the context
  - conditionally render pages (for logged in or logged out users)
