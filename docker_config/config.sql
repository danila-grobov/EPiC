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

-- Teachers
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin) VALUES ('CNapier', 'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec', 'Chris', 'Napier', 'CNapier@ncl.ac.uk', 1);
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin) VALUES ('JColquhoun', 'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec', 'John', 'JColquhoun', 'JColquhoun@ncl.ac.uk', 1);
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin) VALUES ('JSteggles', 'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec', 'Jason', 'Steggles', 'JSteggles@ncl.ac.uk', 1);
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin) VALUES ('MDevlin', 'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec', 'Marie', 'Devlin', 'MDevlin@ncl.ac.uk', 1);
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin) VALUES ('NCook', 'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec', 'Nick', 'Cook', 'NCook@ncl.ac.uk', 1);
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin) VALUES ('Teacher1', 'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec', 'Nick', 'Cook', 'teacher@ncl.ac.uk', 1);

-- Students
INSERT INTO EPiC.Students (Username, Pwd, Firstname, Lastname, Email, Skill, StudentType, Gender, InviteStatus) VALUES ('22334bb017fe1730', null, null, null, 'zanetaylor@ncl.ac.uk', null, null, null, 'waiting');
INSERT INTO EPiC.Students (Username, Pwd, Firstname, Lastname, Email, Skill, StudentType, Gender, InviteStatus) VALUES ('sbilliarda91', 'fa59512ec8542c13efc9b92a6523ed41bc657a60230307c5250e19853a5dc9fa', 'Leif', 'Nancekivell', 'sbilliarda91@ncl.ac.uk', 'Intermediate', 'UK Students', 'Female', 'accepted');
INSERT INTO EPiC.Students (Username, Pwd, Firstname, Lastname, Email, Skill, StudentType, Gender, InviteStatus) VALUES ('Test1', 'ce5b8debe7a450633df8243a01a9afb1c230331e3689058770eb31aea7cc04ce', 'Test1', 'Test1', 'test1@ncl.ac.uk', 'Advanced', 'UK Students', 'Male', 'accepted');


-- Courses
INSERT INTO EPiC.Courses (CourseName, FullCourseName, Color) VALUES ('CSC2031', 'Security and Programming Paradigms', '#F28F38');
INSERT INTO EPiC.Courses (CourseName, FullCourseName, Color) VALUES ('CSC2032', 'Algorithm Design and Analysis', '#F28F38');
INSERT INTO EPiC.Courses (CourseName, FullCourseName, Color) VALUES ('CSC2033', 'Software Engineering Team Project', '#7A306C');
INSERT INTO EPiC.Courses (CourseName, FullCourseName, Color) VALUES ('CSC2034', 'Introducing Contemporary Topics in Computing', '#C8553D');
INSERT INTO EPiC.Courses (CourseName, FullCourseName, Color) VALUES ('CSC2035', 'Operating Systems and Networks', '#7A306C');

-- Tasks
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (1, 'Sheet 1 of workbook', 'CSC2031', null, 1, '', '2021-01-20 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (2, 'Question set 3', 'CSC2031', 1, 1, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (3, 'Question book 7', 'CSC2031', 2, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (4, 'Practical Quiz', 'CSC2031', 1, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (5, 'Reflective Report', 'CSC2031', null, 1, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (6, 'Timesheet', 'CSC2031', 5, 0, null, '2021-03-03 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (7, 'Worksheet week 2', 'CSC2032', null, 1, null, '2021-09-30 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (8, 'Worksheet week 1', 'CSC2032', 7, 1, null, '2021-09-17 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (9, 'Yeetage', 'CSC2032', 8, 1, null, '2021-09-30 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (10, 'Online Synchronous No1', 'CSC2032', 9, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (11, 'Online Synchronous No2', 'CSC2032', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (12, 'Online Synchronous No3', 'CSC2033', null, 1, null, '2021-09-09 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (13, 'Online Synchronous No4', 'CSC2033', 12, 0, null, '2021-09-16 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (14, 'Bio Computing Lecture', 'CSC2033', 12, 0, null, '2021-09-23 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (15, 'Guest Lecture 1', 'CSC2033', 12, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (16, 'Guest Lecture 2', 'CSC2033', null, 1, null, '2021-09-30 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (17, 'Guest Lecture 3', 'CSC2034', null, 0, null, '2021-01-20 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (18, 'Guest Lecture 4', 'CSC2034', null, 1, null, '2021-01-20 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (19, 'Submit Game dev practical', 'CSC2035', null, 0, null, '2021-02-01 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (20, 'Submit Biodev practical', 'CSC2035', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (21, 'Enrichment week activity 1', 'CSC2035', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (22, 'Enrichment week activity 2', 'CSC2035', null, 1, null, '2021-02-10 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (23, 'Enrichment week activity 3', 'CSC2035', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (24, 'Enrichment week activity 4', 'CSC2035', 22, 1, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (25, 'Enrichment week activity 5', 'CSC2035', 24, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (26, 'Personal Tutor meeting', 'CSC2035', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (27, 'Dropin Session 1', 'CSC2035', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (29, 'Dropin Session 2', 'CSC2031', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (30, 'Dropin Session 3', 'CSC2031', null, 1, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (31, 'Operating systems coursework', 'CSC2032', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (32, 'Complete tasks from workbook 1', 'CSC2032', null, 0, null, '2021-02-02 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (35, 'Complete tasks from workbook 2', 'CSC2035', null, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (37, 'Complete tasks from workbook 3', 'CSC2031', 30, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (38, 'Attend pub crawl', 'CSC2033', 16, 0, null, null);
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (39, 'Do maths work', 'CSC2031', null, 0, null, '2021-02-06 15:00:00');
INSERT INTO EPiC.Tasks (TaskID, TaskName, CourseName, ParentTaskID, hasSubtasks, Description, Deadline) VALUES (40, 'Write another report', 'CSC2034', 18, 0, null, null);

-- Grades
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade) VALUES ('CSC2031', 'sbilliarda91@ncl.ac.uk', 0.52, 0.81);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade) VALUES ('CSC2034', 'sbilliarda91@ncl.ac.uk', 0.47, 0.62);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade) VALUES ('CSC2031', 'zanetaylor@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade) VALUES ('CSC2034', 'zanetaylor@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade) VALUES ('CSC2034', 'test1@ncl.ac.uk', 0.65, 0.4);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade) VALUES ('CSC2031', 'test1@ncl.ac.uk', 0.42, 0.9);

-- TasksDone
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 3, '2020-12-14');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 5, '2021-01-19');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 8, '2021-01-18');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 12, '2021-01-16');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 14, '2021-01-18');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 18, '2021-01-18');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 22, '2021-01-23');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 26, '2021-01-08');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 29, '2020-12-30');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 35, '2020-12-08');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('sbilliarda91@ncl.ac.uk', 40, '2020-12-16');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 3, '2021-01-13');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 5, '2021-01-12');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 8, '2021-01-25');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 12, '2020-12-20');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 14, '2020-12-22');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 18, '2021-01-07');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 22, '2021-01-03');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 26, '2021-01-20');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 29, '2021-01-10');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 35, '2020-12-09');
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone) VALUES ('test1@ncl.ac.uk', 40, '2020-12-16');


-- Confidence
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2031', 4, '2020-12-18');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2031', 4, '2020-12-23');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2031', 2, '2021-01-17');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2031', 1, '2021-01-21');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2034', 4, '2020-12-31');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2034', 3, '2021-01-02');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2034', 4, '2021-01-17');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('sbilliarda91@ncl.ac.uk', 'CSC2034', 2, '2021-01-18');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2031', 1, '2020-12-06');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2031', 1, '2021-01-05');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2031', 4, '2021-01-22');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2031', 1, '2021-01-27');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2034', 2, '2020-12-08');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2034', 4, '2020-12-11');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2034', 0, '2020-12-29');
INSERT INTO EPiC.Confidence (Email, CourseName, ConfidenceLevel, Date) VALUES ('test1@ncl.ac.uk', 'CSC2034', 2, '2021-01-02');

-- Teaches
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2031', 'CNapier@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2031', 'JColquhoun@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2031', 'MDevlin@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2031', 'teacher@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2032', 'CNapier@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2032', 'JColquhoun@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2032', 'NCook@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2032', 'teacher@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2033', 'CNapier@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2033', 'JSteggles@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2033', 'teacher@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2034', 'CNapier@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2034', 'JSteggles@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2034', 'teacher@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2035', 'CNapier@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2035', 'JSteggles@ncl.ac.uk');
INSERT INTO EPiC.Teaches (CourseName, Email) VALUES ('CSC2035', 'teacher@ncl.ac.uk');