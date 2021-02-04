# IT-Library

FMI Web project

# How to?

To run the project locally you need to have **npm** installed. Recommended versions are

`npm -v`

`6.14.10`

`node -v`

`14.15.4`

If you are missing **npm** check out https://www.npmjs.com/get-npm.

First install the node modules with `npm i` and now you are all set up. Start the development server with the `npm run serve` command. The server will start at either port **[3000](http://localhost:3000/ "localhost:3000")** or `env.PORT`.

# To use the databases, you need to copy the project folder and paste it in xampp/mysql/data. After that php queries to the database will be correct.

# Draft version notes

This is still a draft version, the core frontend funcitonality is covered, the databases are almost ready, but not updated, the backend functionality is not yet ready, there are only some proxy files that return dummy data.

For the final version we'll finish the import/export system, and finalise the functionality that allows the user to borrow a resource.

The documentaion is not following the template given in the 'Web' FMI course right now, but it'll be updated for the final version of the project.

# Deployment

To make the project ready for production run `npm run build`. This command will generate a folder caleld "dist". Simply copy/paste it in the C:\\xammp\\htdocks folder and run your apache server. Now navigate to localhost/dist/index.html.
