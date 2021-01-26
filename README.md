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

####Pages (App.jsx) - 
* **Home**: After logging in, teachers are able to see the dashboard for one of the courses they teach. Using the dropdown 
  button in the navigation bar, a teacher can toggle between the various courses they teach. Each course dashboard has
  an insights bar at the top, that when fully implemented, would show a statement describing unusual trends for that 
  week. Below this to the left, is a pie-chart that teachers can filter to view the average confidence for different
  groups across various dates. Similarly, to the right, is a card that allows teachers to view how many tasks have been
  completed over a period of time. Below this is a line graph that shows the average student confidence for the entire
  course over a period of time. Lastly is a scatter graph, that when implemented, displays a graph where you can filter
  and view the various groups and where they lie in terms of average confidence and average
  grades.
* **Tasks**: On this page, students can view the tasks set for students in that course. When fully implemented, teachers
  edit the tasks, remove them, and add more.
* **Manage**: The manage page holds a table of all of the students enrolled in that course. In this page, teachers can
  add and remove students, as well as check their invite status. Teachers can also filter through their students and 
  search for them using the bar above the table. Lastly, teachers can import grades with JSON files!
* **Profile**: When a teacher clicks on the phrase "Hello, (their name)", They'll be taken to their profile page, where
whe fully implemented, they can edit their profile data.

###Student-View:

####Registration:
* When students receive their registration link, they'll be sent to the registration form which allows them to creat a
a username, password, and answer some questions for us which help with tracking progress of various student groups. 
* Our program uses Gmail as our SMTP server.

####Logging in -
* You can log in as a student by using the username "Test1" and the password "Test1234"
####Pages (Dashboard.jsx) -
* **Home**: After logging in, students are able to see their dashboard. Students are greeted by a
  calendar that displays the date, as well as some any deadlines they have within the next month. Below this are the
  course cards for each module a student is enrolled in. It displays the course code as well as the progress bar.
  
* **Course Pages**: When a student clicks on a course card, it will take them to that course's page. In that course's
  page, a student can find an enlarged version of the progress bar. Next to it is a card that displays the deadlines for
  that course. Below these a student can find a card that allows students to enter their confidence in the course for
  the day. Lastly, below the confidence card, students can find their own versions of the course checklists.
  Once they tick a task as complete and updates the page, it will be marked as complete both on
  the deadlines card, as well as fill out slightly more of the progress bar!
* **Profile**: When a student clicks on the phrase "Hello, (their name)", They'll be taken to their profile page, where
  whe fully implemented, they can edit their profile data.



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



##Disclaimers
***
Unfortunately, we were unable to fully deliver on some of the following features/functionalities. Some are included in 
the front-end with limited or no functionality, while others were left out.

####Frontend Still Included:
* Insights
* Profile page
* Scatter graph
* Teacher tasks page

####Not Included:
* Login limit
* Average confidence graph in the student course page
* Checkboxes being clicked updating the progress bar without having to refresh
* Admin view


##Testing
***

###Our Approach
Our team addressed testing our web application in two different ways with the time we had available. 

We have used unit tests to test the table component, this allows us to make sure that the table itself
and its child components work as intended. Front-end code is usually hard to test as most of the features
result in some sort of visual feedback, we were able to overcome that by using a virtual dom. Instead of
rendering components in a browser, we do it in a simulated environment, where we can interact with them
programmatically and query the virtual screen to make sure that the expected result is achieved. We did not
test other components due to lack of time, ideally every component would be tested like that.

These tests can be found in the  ``__tests__`` folder within the EPiC project, called ```test.table.js```. The results
can be found in the ```__results__``` folder outside the EPiC project, called ```Test_Results_-_test_table_js```.

Our second type of tests were loosely based on acceptance testing, which focuses on evaluating "the system's
compliance with the business requirements and verify if it is has met the required criteria for delivery to end users."
(https://www.tutorialspoint.com/software_testing_dictionary/acceptance_testing.htm) These tests are focused around
making sure the three main requirements for the EPiC project are met. We have also included tests for the registration
and login pages. 

These tests can be found in the ``__tests__`` folder within the EPiC project, and called ```req_testing_template.docx```
. The results cn be found within the ```__results__``` folder outside of the EPiC project, 
called ```Testing_[person's name].docx```.



