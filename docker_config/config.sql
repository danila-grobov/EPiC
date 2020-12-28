CREATE DATABASE IF NOT EXISTS EPiC;
USE EPiC;
CREATE TABLE Teachers (
Username varchar(50) NOT NULL,
Pwd varchar(200) NOT NULL,
Firstname varchar(50) NOT NULL,
Lastname varchar(50) NOT NULL,
Email varchar(50) NOT NULL,
Admin boolean NOT NULL,
PRIMARY KEY(Username)
);

CREATE TABLE Students (
Username varchar(50),
Pwd varchar(200),
Firstname varchar(50),
Lastname varchar(50),
Email varchar(50) UNIQUE,
Skill varchar(15),
StudentType varchar(20),
Gender varchar(5),
InviteStatus varchar(50) NOT NULL,
PRIMARY KEY(Username)
);

CREATE TABLE Courses(
CourseName varchar(10) NOT NULL,
Color varchar(20) NOT NULL,
PRIMARY KEY(CourseName)
);

CREATE TABLE Tasks(
TaskID varchar(5) NOT NULL,
CourseName varchar(10),
ParentTaskID varchar(5),
Description text NOT NULL,
Deadline datetime,
PRIMARY KEY (TaskID),
FOREIGN KEY (CourseName)
        REFERENCES Courses(CourseName),
FOREIGN KEY (ParentTaskID)
        REFERENCES Tasks(TaskID)
);

CREATE TABLE Grades(
CourseName varchar(10) NOT NULL,
Username varchar(50),
PercentDone float,
Grade float,
FOREIGN KEY (CourseName)
        REFERENCES Courses(CourseName),
FOREIGN KEY (Username)
        REFERENCES Students(Username)
);

CREATE TABLE TasksDone (
Username varchar(50),
TaskID varchar(5),
FOREIGN KEY (Username)
        REFERENCES Students(Username),
FOREIGN KEY (TaskID)
        REFERENCES Tasks(TaskID)
);
