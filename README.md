# Data Pipeline Server

Local server to upload data in compressed files, transform the JSON objects, and publish them to MongoDB.

## Setup

You should have Node version 16 installed in order to run this server properly.

```sh
npm install
```

You will need to set your `.env` file with the appropriate environment variables. You can copy the `.env.example` file, which will give you the following:

```
MONGODB_USERNAME=""    // MongoDB user name
MONGODB_PASSWORD=""    // MongoDB user password
MONGODB_HOST=""        // MongoDB host url
```

This makes up the following URI to connect to MongoDB

```
mongodb+srv://<MONGODB_USERNAME>:<MONGODB_PASSWORD>@<MONGODB_HOST>/?retryWrites=true&w=majority
Ex: mongodb+srv://user:password@instance.mongodb.net/?retryWrites=true&w=majority
```

## Development

To start the server and automatically send the transformed files to MongoDB:

```sh
npm start
```

## Test

To run unit tests with Jest:

```sh
npm run test
```

## Format

To run format with Prettier:

```sh
npm run format
```

## Lint

To run linter with ESLint:

```sh
npm run lint
```
