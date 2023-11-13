# P7
SSDI - project 7
# Prerequisites
Before running the project, make sure you have the following installed on your system:

Node.js: Ensure that Node.js is installed on your machine.

MongoDB: Install MongoDB to set up the database for the Photo Share App.

# Getting Started
# Clone the Repository:


git clone <repository-url>


# Navigate to Project Directory:

bash
Copy code
cd project7


#  Install Dependencies:

npm install
Start MongoDB
Open a new terminal window.

# Run the MongoDB instance:


mongod
Load Database


# In the project directory, run the command:

node loadDatabase.js
Start Web Server
Open a new terminal window.

# Install nodemon for automatic server restarts:


npm install -g nodemon

# Start the web server with nodemon:


nodemon webServer.js
Access the Photo Share App
Open your web browser and go to http://localhost:3000.

Explore the Photo Share App with the added features, such as user login, commenting on photos, and photo uploading.

Running Tests

# To run the provided tests for backend API validation, use the following command:


npm run test
Ensure that the database has only the objects from loadDatabase.js before running the tests.

Additional Notes
If you encounter any issues or errors during the setup, check the console output for error messages. Make sure all dependencies are installed correctly.

If you need to reset the database, re-run the loadDatabase.js script.

For security reasons, avoid using sensitive information in the app during testing.

Feel free to reach out if you have any questions or need further assistance!
