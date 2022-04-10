# Binary Tree API

This is an API for a user Binary Tree build using Node/Express.

## How to install on localhost

Clone the repo on your computer and then run the following commands. Ensure you are in the project folder. The below command will install all the dependencies.

```sh
npm install
```

## How to use on localhost

To test the API, you can set up a local server via follwong commands.

```sh
npm run dev
```

The above command will start a local node server on PORT 3001 and you can check the API on http://localhost:3001
Once the dev server is running, you can also use POSTMAN to send GET and POST requests to the API. While using POSTMAN to send POST requests, you can send along the parameters via `x-www-form-urlencoded` option available int he POSTMAN desktop native client.

## User guide

This API has 3 endpoints as explained below. The API returns success and error messages as JSON data.

- User registration

This endpoint has 4 required arguments `name`, `user_name`, `sponsor_user_name`, `position`.
```sh
POST http://localhost:3001/register
```


- Fetch all registered users
```sh
GET http://localhost:3001/fetch/all
```


- Fetch a specific sponsor with a specified level depth

e.g: http://localhost:3001/danish_123/3
This will get the data for sponsor `danish_123` along with it's users that go down `3` levels.
```sh
GET http://localhost:3001/:user_name/:level
```

## Support
For support or questions, you can contact me on
- Twitter https://twitter.com/danziqbal
- LinkedIn https://www.linkedin.com/in/sheikh-danish-iqbal-444196108/

