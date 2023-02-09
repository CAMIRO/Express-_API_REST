# Calculator API

This API is used to calculate simple mathematical equations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js

### Installing

1. Clone the repository

```
https://github.com/CAMIRO/Express-_API_REST
```

2. Install dependencies

```
npm install
```

3. Start the server

```
npm start
```

## Usage

Send a POST request to `/calculate` with a body containing a `equation` parameter.

For example:

```
POST /calculate
{
  "equation": "10*(2+5)*10)"
}
```

The API will return a response with the calculated result.

```
{
  "result": 700
}
```

## Scripts

1. `npm run build` - When you run this command in your terminal window, it will build your project.

2. `npm run dev` - This command will spin up a development server at http://localhost:3000. It will also restart your server when you change something in your code.

3. `npm run start` - It will start the production server at http://localhost:3000 after building your project.

## Running the tests

To run the unit tests, use the following command:

```
npm test
```
