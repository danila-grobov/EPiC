CREATE DATABASE IF NOT EXISTS EPiC;
USE EPiC;

CREATE TABLE SessionStore
(
    SId     varchar(128)     NOT NULL,
    Expires int(11) UNSIGNED NOT NULL,
    Data    mediumtext,
    PRIMARY KEY (SId)
);

CREATE TABLE Teachers
(
    Username  varchar(50)  NOT NULL,
    Pwd       varchar(200) NOT NULL,
    Firstname varchar(50)  NOT NULL,
    Lastname  varchar(50)  NOT NULL,
    Email     varchar(50)  NOT NULL,
    Admin     boolean      NOT NULL,
    PRIMARY KEY (Username)
);

CREATE TABLE Students
(
    Username     varchar(50) UNIQUE,
    Pwd          varchar(200),
    Firstname    varchar(50),
    Lastname     varchar(50),
    Email        varchar(50),
    Skill        varchar(15),
    StudentType  varchar(25),
    Gender       varchar(15),
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
    TaskTitle    varchar(200) NOT NULL,
    CourseName   varchar(10),
    ParentTaskID int,
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

CREATE TABLE TasksDone (
                           Email varchar(50),
                           TaskID int,
                           DateDone date,
                           FOREIGN KEY (Email)
                               REFERENCES Students(Email),
                           FOREIGN KEY (TaskID)
                               REFERENCES Tasks(TaskID),
                           UNIQUE (Email, TaskID)
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
# Create sample teacher data
INSERT INTO EPiC.Teachers (Username, Pwd, Firstname, Lastname, Email, Admin)
VALUES ('Teacher1',
        'de8bb720e7e3df1cb968777d9ee2f1908bcafbe1e047daeda0443ef5583b24ec',
        'Nick',
        'Cook',
        'teacher@ncl.ac.uk',
        1);

# Create sample student data
INSERT INTO EPiC.Students (Username, Pwd, Firstname, Lastname, Email, Skill, StudentType, Gender, InviteStatus)
VALUES ('Test1',
        '89cfa28dd61c8b109ad37d9786fdae2b9962213a48cf0b70051ea551904af031',
        'Test1',
        'test',
        'test1@ncl.ac.uk',
        'Advanced',
        'UK Students',
        'Male',
        'accepted'),
       ('Test2',
        '89cfa28dd61c8b109ad37d9786fdae2b9962213a48cf0b70051ea551904af031',
        'Test2',
        'test',
        'test2@ncl.ac.uk',
        'Advanced',
        'UK Students',
        'Female',
        'accepted'),
       ('Test3',
        '89cfa28dd61c8b109ad37d9786fdae2b9962213a48cf0b70051ea551904af031',
        'Test3',
        'test',
        'test3@ncl.ac.uk',
        'Advanced',
        'International Students',
        'Female',
        'accepted'),
       ('Test4',
        '89cfa28dd61c8b109ad37d9786fdae2b9962213a48cf0b70051ea551904af031',
        'Test4',
        'test',
        'test4@ncl.ac.uk',
        'Intermediate',
        'EU Students',
        'Male',
        'accepted'),
       ('Test5',
        '89cfa28dd61c8b109ad37d9786fdae2b9962213a48cf0b70051ea551904af031',
        'Test5',
        'test',
        'test5@ncl.ac.uk',
        'Beginner',
        'EU Students',
        'Male',
        'accepted');

# Create sample course data
INSERT INTO EPiC.Courses (CourseName, Color, FullCourseName)
VALUES ('CSC2033', '#7A306C', 'Software Engineering Team Project');
INSERT INTO EPiC.Courses (CourseName, Color, FullCourseName)
VALUES ('CSC2031', '#F28F38', 'Security and Programming Paradigms');
INSERT INTO EPiC.Courses (CourseName, Color, FullCourseName)
VALUES ('CSC2032', '#F28F38', 'Algorithm Design and Analysis');
INSERT INTO EPiC.Courses (CourseName, Color, FullCourseName)
VALUES ('CSC2034', '#C8553D', 'Introducing Contemporary Topics in Computing');
INSERT INTO EPiC.Courses (CourseName, Color, FullCourseName)
VALUES ('CSC2035', '#7A306C', 'Operating Systems and Networks');

#Create sample grades data
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2031', 'test1@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2032', 'test1@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2033', 'test1@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2034', 'test1@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2035', 'test1@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2031', 'test2@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2032', 'test2@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2033', 'test2@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2034', 'test2@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2035', 'test2@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2031', 'test3@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2032', 'test3@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2033', 'test3@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2034', 'test3@ncl.ac.uk', null, null);
INSERT INTO EPiC.Grades (CourseName, Email, PercentDone, Grade)
VALUES ('CSC2035', 'test3@ncl.ac.uk', null, null);



# Create sample task data
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task1', 'CSC2031', null, null, '2021-01-22 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task2', 'CSC2031', 1, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task3', 'CSC2031', 1, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task4', 'CSC2031', 3, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task5', 'CSC2031', 1, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task6', 'CSC2031', null, null, '2021-03-03 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task7', 'CSC2032', null, null, '2021-09-30 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task8', 'CSC2032', null, null, '2021-09-17 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task9', 'CSC2032', null, null, '2021-09-30 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task10', 'CSC2032', 9, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task11', 'CSC2032', 9, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task12', 'CSC2033', null, null, '2021-09-09 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task13', 'CSC2033', null, null, '2021-09-16 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task14', 'CSC2033', null, null, '2021-09-23 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task15', 'CSC2033', 14, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task16', 'CSC2033', null, null, '2021-09-30 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task17', 'CSC2034', null, null, '2021-01-20 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task18', 'CSC2034', null, null, '2021-01-20 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task19', 'CSC2035', null, null, '2021-02-01 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task20', 'CSC2035', 19, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task21', 'CSC2035', 19, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task22', 'CSC2035', null, null, '2021-02-10 15:00:00');
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task23', 'CSC2035', 22, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task24', 'CSC2035', 22, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task25', 'CSC2035', 22, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task26', 'CSC2035', 22, null, null);
INSERT INTO EPiC.Tasks (TaskTitle, CourseName, ParentTaskID, Description, Deadline)
VALUES ('Task27', 'CSC2035', 22, null, null);

#Sample data for tasksDone
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test1@ncl.ac.uk', 1, "2021-09-01");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test1@ncl.ac.uk', 2, "2021-09-02");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test1@ncl.ac.uk', 3, "2021-09-03");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test1@ncl.ac.uk', 4, "2021-09-04");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test2@ncl.ac.uk', 5, "2021-09-04");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test2@ncl.ac.uk', 17, "2021-09-05");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test2@ncl.ac.uk', 7, "2021-09-06");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test3@ncl.ac.uk', 9, "2021-09-07");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test3@ncl.ac.uk', 10, "2021-09-08");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test3@ncl.ac.uk', 11, "2021-09-09");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test4@ncl.ac.uk', 12, "2021-09-10");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test4@ncl.ac.uk', 5, "2021-09-11");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test4@ncl.ac.uk', 15, "2021-09-12");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test5@ncl.ac.uk', 21, "2021-09-13");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test5@ncl.ac.uk', 25, "2021-09-14");
INSERT INTO EPiC.TasksDone (Email, TaskID, DateDone)
VALUES ('test5@ncl.ac.uk', 26, "2021-09-15");