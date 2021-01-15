CREATE DATABASE IF NOT EXISTS EPiC;
USE EPiC;
CREATE TABLE Teachers (
Username varchar(50) NOT NULL UNIQUE,
Pwd varchar(200) NOT NULL,
Firstname varchar(50) NOT NULL,
Lastname varchar(50) NOT NULL,
Email varchar(50) NOT NULL,
Admin boolean NOT NULL,
PRIMARY KEY(Email)
);

CREATE TABLE Students (
Username varchar(50) UNIQUE,
Pwd varchar(200),
Firstname varchar(50),
Lastname varchar(50),
Email varchar(50),
Skill varchar(15),
StudentType varchar(20),
Gender varchar(5),
InviteStatus varchar(50) NOT NULL,
PRIMARY KEY(Email)
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
Email varchar(50) UNIQUE ,
PercentDone float,
Grade float,
FOREIGN KEY (CourseName)
        REFERENCES Courses(CourseName),
FOREIGN KEY (Email)
        REFERENCES Students(Email)
);

CREATE TABLE TasksDone (
Username varchar(50),
TaskID varchar(5),
FOREIGN KEY (Username)
        REFERENCES Students(Username),
FOREIGN KEY (TaskID)
        REFERENCES Tasks(TaskID)
);

CREATE TABLE Teaches(
CourseName varchar(10) NOT NULL,
Email varchar(50) ,
FOREIGN KEY (CourseName)
   REFERENCES Courses(CourseName),
FOREIGN KEY (Email)
   REFERENCES Teachers(Email),
UNIQUE (CourseName, Email)
);
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin)
VALUES ('Teacher1',
        'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec',
        'Nick',
        'Cook',
        'teacher@ncl.ac.uk',
        1);
INSERT INTO EPiC.Courses (CourseName, Color)
VALUES ('CSC2033','#7A306C');
INSERT INTO EPiC.Courses (CourseName, Color)
VALUES ('CSC2031','#F28F38');
INSERT INTO EPiC.Courses (CourseName, Color)
VALUES ('CSC2032','#F28F38');
INSERT INTO EPiC.Courses (CourseName, Color)
VALUES ('CSC2034','#C8553D');
INSERT INTO EPiC.Courses (CourseName, Color)
VALUES ('CSC2035','#7A306C');