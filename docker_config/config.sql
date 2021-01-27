CREATE DATABASE IF NOT EXISTS EPiC;
USE EPiC;
CREATE TABLE Teachers
(
    Username  varchar(50)  NOT NULL UNIQUE,
    Pwd       varchar(200) NOT NULL,
    Firstname varchar(50)  NOT NULL,
    Lastname  varchar(50)  NOT NULL,
    Email     varchar(50)  NOT NULL,
    Admin     boolean      NOT NULL,
    PRIMARY KEY (Email)
);

CREATE TABLE SessionStore
(
    SId     varchar(128)     NOT NULL,
    Expires int(11) UNSIGNED NOT NULL,
    Data    mediumtext,
    PRIMARY KEY (SId)
);


CREATE TABLE Students
(
    Username     varchar(50) UNIQUE COLLATE latin1_general_cs,
    Pwd          varchar(200),
    Firstname    varchar(50),
    Lastname     varchar(50),
    Email        varchar(50),
    Skill        varchar(50),
    StudentType  varchar(50),
    Gender       varchar(50),
    InviteStatus varchar(50) NOT NULL,
    PRIMARY KEY (Email)
);

CREATE TABLE Courses
(
    CourseName     varchar(10)  NOT NULL,
    FullCourseName varchar(200) NOT NULL,
    Color          varchar(20)  NOT NULL,
    PRIMARY KEY (CourseName)
);

CREATE TABLE Tasks
(
    TaskID       int          NOT NULL AUTO_INCREMENT,
    TaskName     varchar(100) NOT NULL,
    CourseName   varchar(10)  NOT NULL,
    ParentTaskID int,
    hasSubtasks  boolean,
    Description  text,
    Deadline     datetime,
    PRIMARY KEY (TaskID),
    FOREIGN KEY (CourseName)
        REFERENCES Courses (CourseName),
    FOREIGN KEY (ParentTaskID)
        REFERENCES Tasks (TaskID)
);

CREATE TABLE Grades
(
    CourseName  varchar(10) NOT NULL,
    Email       varchar(50) NOT NULL,
    PercentDone float,
    Grade       float,
    FOREIGN KEY (CourseName)
        REFERENCES Courses (CourseName),
    FOREIGN KEY (Email)
        REFERENCES Students (Email),
    UNIQUE (CourseName, Email)
);

CREATE TABLE TasksDone
(
    Email    varchar(50),
    TaskID   int,
    DateDone date,
    FOREIGN KEY (Email)
        REFERENCES Students (Email),
    FOREIGN KEY (TaskID)
        REFERENCES Tasks (TaskID),
    UNIQUE (Email, TaskID)
);

CREATE TABLE Teaches
(
    CourseName varchar(10) NOT NULL,
    Email      varchar(50),
    FOREIGN KEY (CourseName)
        REFERENCES Courses (CourseName),
    FOREIGN KEY (Email)
        REFERENCES Teachers (Email),
    UNIQUE (CourseName, Email)
);

CREATE TABLE Confidence
(
    Email           varchar(50) NOT NULL,
    CourseName      varchar(10) NOT NULL,
    ConfidenceLevel int         NOT NULL,
    Date            date        NOT NULL,
    FOREIGN KEY (Email)
        REFERENCES Students (Email),
    FOREIGN KEY (CourseName)
        REFERENCES Courses (CourseName),
    UNIQUE (CourseName, Email, Date)
);
