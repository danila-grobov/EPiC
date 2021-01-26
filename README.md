# EPiC Learning and Engagement Tool
***
Hi, welcome to our application! EPiC is a research group within the School of Computing that focus on improving the 
experience for students and finding innovative teaching methods to aid learning.
The group is one of the biggest in the country that focuses on computer education research and they
are well known internationally.

This tool is designed to track student progress and confidence in each course and
will help contribute to EPiC's research in student learning and engagement.


## Getting Started
***
### Installation:
1. Make sure you have Docker 2.5.0.0 or newer installed on your machine.
1. Make sure you have Node.js 14.15.4 or newer installed on your machine.
1. Open up the terminal in the same folder that holds the package.json file. 

### Starting Docker Containers:
Make sure that docker is running. After that just type ```npm run docker``` to build and  
start the containers.

### Starting Frontend Interpreter (WebPack):
* Once the terminal reads ```db     | 2021-01-21T22:40:42.145701Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld:
  ready for connections. Version: '8.0.22'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQ
  L Community Server - GPL.```(look for ```ready for connections```) you're ready to start the frontend!

* Open up a new terminal in the same place as the first, and without closing the original, type in the new one,
  ```npm run frontend```.
  
### Starting Backend Server:
Similarly to starting up the frontend, open up a new terminal and without closing the other two, type in the new one,
  ```npm run backend```. Once it's ready, you should receive a link which you can follow to your preferred browser!


## Requirement Features
***
1. **Allow students to track their progress**: In our project, we have met this requirement by
implementing various features. Students can view their progress on a progress bar that appears for each course they're
   enrolled in both on the dashboard and in their respective course pages. They can also track their progress by
   accessing their course's checklist, so they can check off each task they've done. 
1. **Allow staff to see the progress of their students**: Staff are able to view their students progress on their
   teacher-view dashboard. The dashboard has various graphs and statistics that allow them to view not only how all
   students are doing, but also filtering the results by gender, nationality, and ability.
1. **Extendable**: Our project fulfils this requirement within the Manage page in the teacher-view. Teachers can upload
JSON files of student emails, or manually, to invite them to one of their courses. Teachers can also remove students
   just as easily, on the Manage page!
   


##Using the Web-Application
***
###Teacher-View:
####Logging in - 
* You can log in as a teacher by using the username "Teacher1", and the password "Teacher1"

####Pages - 
* Home:
* Tasks:
* Manage:

###Student-View:
####Logging in -
* You can log in as a student by using the username "Test1" and the password "Test1234"
####Pages -
* Home: 
* Course Pages:



## Coding Conventions
***
###Project Structure:
####Frontend -
* All components related to the same feature are located within the same folder.
* Scss files are located in a Scss folder.
* General components that are used in several pages are located in a separate folder.
* All assets are located in their respective folders.
* All custom hooks are located in their respective folder.

####Backend -
* All the operations relating to the same entity in the database are located in their respective files.
* All endpoints are located in the app.js file.

###Variables:
* Variables are named with camelCase.
* Use const variables wherever possible, use let variables if necessary.

###Functions:
* Functions are named with camelCase.
* Use arrow functions where possible and only use regular functions if necessary.
* Name functions using verbs.

###Components:
* Named with PascalCase.
* All the components are functional (no classes).



##Testing
***

