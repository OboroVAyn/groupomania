# groupomania

Require:
nodejs and vuejs installed and with their latest version

Clone this repository in a local folder then follow the instructions for both backend and frontend below:

- frontend:
with your terminal cd to frontend from root
Install vuejs, vue cli with yarn or npm
Run `npm run serve`  
Navigate to `http://localhost:8080/`. 
The app will automatically reload if you change any of the source files.

- backend:
with your terminal cd to backend from root
Install multer, jsonwebtoken, mongoose, fs, bcrypt, nodemon with yarn or npm
Don't forget to add a folder /images to manage your imagefile with multer
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
Then run nodemon server.
