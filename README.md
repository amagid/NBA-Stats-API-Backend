# NBA Stats API Backend
An interface for working with the NBA Stats API.

##Setup
There are a few files that are not included in the repo that this application needs in order to run. These files are excluded for a variety of reasons, including security and to make things easier for the dev team.

1) Make sure Python is installed.
2) Navigate to the directory where Python is installed and install the dependencies: "requests","json" and "pandas".
3) Copy the path to the Python.exe executable and paste it into config/development.json under Python.pythonPath.
4) Make sure MySQL is installed.
5) Import the "database.sql" file into your MySQL installation.
6) Make sure node.js and npm are installed. You can use "node -v" and "npm -v" to quickly check this. If you see semvers, you're good.
7) Navigate to the project directory in your console and type "npm install".
8) Navigate to the project directory in your console and type "npm run start" to make sure it works.
9) Navigate to the project directory in your console and type "npm test" to make sure it works.