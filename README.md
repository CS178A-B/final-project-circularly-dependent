# CS178A-B-Template

## Table of Contents
- [Overview](#overview)
- [Usage](#usage)
- [How To Run](#how-to-run)
- [Diagrams](#diagrams)
- [Dependencies](#dependencies)

## Overview
<Include project description>

## Team
<a href="https://github.com/GrayGorilla" target="_blank"><img src="https://avatars2.githubusercontent.com/u/43688010?s=400&u=170fcd351efcc42441c6689c3221cabac286f520&v=4" align="left" height="30px">Nathan Brennan </a>

<a href="https://github.com/jalec789" target="_blank"><img src="https://avatars0.githubusercontent.com/u/31293853?s=400&u=7659dcc0cdeeadfe836d2781844b34d80764c5f4&v=4" align="left" height="30px">Jason Chan </a>

<a href="https://github.com/sha021" target="_blank"><img src="https://avatars2.githubusercontent.com/u/43655180?s=400&u=e858756c01f86ccbeae24090f24dc0045d6997d6&v=4" align="left" height="30px">Siena Seung Eun Ha </a>

## Usage
Demo: <Link to youtube video>

<Screenshot of application>

## How To Run 

### Server:

May need to configure MySQL first.<br />
If this step is needed, run the following commands:<br />
**`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'CS178!CD!dc';`<br />
`FLUSH PRIVILEGES;`<br />
`set global net_buffer_length=1000000;`<br />
`set global max_allowed_packet=1000000000;`**

This will downgrade MySQL authentication to match with NodeJS.

In the project directory, you can satisfy dependencies with:

#### `npm install`

To run server in development mode:

### `npm start`

Logging will be on the console you ran from.<br />
Server will be listening on [http://localhost:4000](http://localhost:4000).

Server will restart if you make edits.<br />
You will also see any lint errors in the console.


### Client:

Start new terminal, seperate from the server.<br />
In the project directory, change to client directory:

#### `cd deep-capitalizer`

You can satisfy dependencies with:

#### `npm install`

To run client in development mode:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Diagrams

Sequence Diagram

Frontend Structure


Overall System Diagram

## Dependencies

Install Node Package Manager (npm). [Helpful Documentation](https://www.npmjs.com/get-npm)

Install MySQL (https://dev.mysql.com/downloads/mysql/)


