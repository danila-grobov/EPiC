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
Username varchar(50) UNIQUE,
Pwd varchar(200),
Firstname varchar(50),
Lastname varchar(50),
Email varchar(50),
Skill varchar(15),
StudentType varchar(25),
Gender varchar(15),
InviteStatus varchar(50) NOT NULL,
PRIMARY KEY(Email)
);

CREATE TABLE Courses(
CourseName varchar(10) NOT NULL,
Color varchar(20) NOT NULL,
PRIMARY KEY(CourseName)
);

CREATE TABLE Tasks(
TaskID int NOT NULL AUTO_INCREMENT,
TaskName varchar(100) NOT NULL,
CourseName varchar(10) NOT NULL,
ParentTaskID int,
hasSubtasks boolean,
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
Email varchar(50),
TaskID varchar(5),
DateDone date,
FOREIGN KEY (Email)
        REFERENCES Students(Username),
FOREIGN KEY (TaskID)
        REFERENCES Tasks(TaskID),
UNIQUE (Email, TaskID)
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