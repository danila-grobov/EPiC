import "../scss/teacherPage.scss";

import React, {useEffect, useState} from "react";
import PieGraph from "./PieGraph";
import ScatterGraph from "./ScatterGraph";
import LineGraph from "./LineGraph";
import Dropdown from "../general_components/Dropdown";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import TasksComplete from "./TasksComplete";
import moment from "moment";

export default () => {
    const pages = ["CSC2031", "CSC2032", "CSC2033", "CSC2034"];
    const titleFilter = {label: "Filter", value: ""};
    const [currentOptionFilter, setCurrentOptionFilter] = useState(titleFilter);

    const [currentOptionDateFilter, setCurrentOptionDateFilter] = useState({label: "Date", value: moment().format("YYYY-MM-DD")});

    const [currentOptionTaskFilter, setCurrentOptionTaskFilter] = useState({label: "Filter", value: 0});

    const titleLimitedFilter = {label: "Filter", value: "Filter"};
    const [currentOptionLimitedFilter, setCurrentOptionLimitedFilter] = useState(titleLimitedFilter);

    const [stateTasks, setTasks] = useState([]);
    const [taskIDs, setTaskIDs] = useState([]);

    useEffect(() => {
        axios.get('/api/t/droptasks', {
            params: {
                course: "CSC2031" //Get from NavBar
            }
        }).then(res => {
            setTasks(res.data.tasks);
            setTaskIDs(res.data.taskIDs);
        })
    }, [])

    let taskDropOptions = [];
    for (let i = 0; i < stateTasks.length; i++){
        taskDropOptions.push({label:stateTasks[i], value:taskIDs[i]});
    }

    const dateOptions = [
        {label: "Last 7 Days", value: moment().subtract(7, 'd').format('YYYY-MM-DD')},
        {label: "Last 14 Days", value: moment().subtract(14, 'd').format('YYYY-MM-DD')},
        {label: "Last 4 Weeks", value: moment().subtract(28, 'd').format('YYYY-MM-DD')},
        {label: "Last 8 Weeks", value: moment().subtract(56, 'd').format('YYYY-MM-DD')}]


    return (
        <div className="app">
            {/*<NavBar pages={pages} name={name} pagePaths={pagePaths} adminRole={false}/>*/}

            <div className="flex-item-full">
                <h4>Today's Insight</h4>
                <h1>“80% of advanced ability students are feeling low confidence levels this week”</h1>
            </div>

            <div className="flex-container">
                <div className="flex-item-half">
                    <h3>Confidence Distribution for Specified Date</h3>
                    <Dropdown currentOption={currentOptionFilter}
                          setCurrentOption={setCurrentOptionFilter}
                          dropOptions={[
                              {label: "All Students", value: " "},
                              {label: "UK Students", value: "AND Students.StudentType = 'UK Students'"},
                              {label: "EU Students", value: "AND Students.StudentType = 'EU Students'"},
                              {label: "International Students", value: "AND Students.StudentType = 'International Students'"},
                              {label: "Men", value: "AND Students.Gender = 'Male'"},
                              {label: "Women", value: "AND Students.Gender = 'Female'"},
                              {label: "Non-Binary", value: "AND Students.Gender = 'Non-Binary'"},
                              {label: "Advanced Ability", value: "AND Students.Skill = 'Advanced'"},
                              {label: "Intermediate Ability", value: "AND Students.Skill = 'Intermediate'"},
                              {label: "Beginner Ability", value: "AND Students.Skill = 'Beginner'"}
                          ]}
                    />
                    <Dropdown currentOption={currentOptionDateFilter}
                          setCurrentOption={setCurrentOptionDateFilter}
                          dropOptions={[
                              {label: moment().format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                              {label: moment().subtract(1, 'd').format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                              {label: moment().subtract(2, 'd').format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                              {label: moment().subtract(3, 'd').format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                              {label: moment().subtract(4, 'd').format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                              {label: moment().subtract(5, 'd').format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                              {label: moment().subtract(6, 'd').format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                          ]}
                    />
                    <PieGraph course={"CSC2031"} filter={currentOptionFilter.value} date={currentOptionDateFilter.value}/>
                </div>

                <div className="flex-item-half-stat">
                    <Dropdown currentOption={currentOptionTaskFilter}
                          setCurrentOption={setCurrentOptionTaskFilter}
                          dropOptions={taskDropOptions}
                    />

                    <Dropdown currentOption={currentOptionDateFilter}
                          setCurrentOption={setCurrentOptionDateFilter}
                          dropOptions={dateOptions}
                    />
                    <TasksComplete course={/*Get from NavBar*/"CSC2031"}
                                   date={currentOptionDateFilter.value}
                                   task={currentOptionTaskFilter.value}/>
                </div>

                <div className="flex-item-full">
                    <h3>Average Confidence VS. Average Grade</h3>
                    <Dropdown currentOption={currentOptionLimitedFilter}
                          setCurrentOption={setCurrentOptionLimitedFilter}
                          dropOptions={[
                              {label: "Gender", value: "Gender"},
                              {label: "Nationality", value: "Nationality"},
                              {label: "Ability", value: "Ability"}
                          ]}
                    />
                    <ScatterGraph />
                </div>

                <div className="flex-item-full">
                    <h3>Average Confidence Over Time</h3>
                    <Dropdown currentOption={currentOptionDateFilter}
                              setCurrentOption={setCurrentOptionDateFilter}
                              dropOptions={dateOptions}
                    />
                    <LineGraph course={"CSC2031"} date={"2021-01-14"}/>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
}