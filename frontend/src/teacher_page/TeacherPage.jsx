/**
 * @author Jake Hobbs
 */

import "../scss/teacher_page/teacherPage.scss";
import React, {useEffect, useState} from "react";
import PieGraph from "./PieGraph";
import ScatterGraph from "./ScatterGraph";
import LineGraph from "./LineGraph";
import Dropdown from "../general_components/Dropdown";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import TasksComplete from "./TasksComplete";
import moment from "moment";

/**
 * Hold and call each of the graph/stat components for the teacher page.
 */

export default ({course}) => {

    // Set initial dropdown values.
    const [currentOptionFilter, setCurrentOptionFilter] = useState({label: "Filter", value: ""});
    const [pieDateFilter, setPieDateFilter] = useState({label: moment().format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")})
    const [currentOptionDateFilter, setCurrentOptionDateFilter] = useState({label: "Last 7 Days", value: moment().subtract(7, 'days').format('YYYY-MM-DD')});
    const [currentOptionTaskFilter, setCurrentOptionTaskFilter] = useState({label: "Filter", value: 0});
    const [currentOptionLimitedFilter, setCurrentOptionLimitedFilter] = useState({label: "Filter", value: "Nationality"});

    // Set State variables for getting tasks.
    const [stateTasks, setTasks] = useState([]);
    const [taskIDs, setTaskIDs] = useState([]);

    // Get tasks from DB relevant to the course.
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

    // Set dropdown values with tasks.
    let taskDropOptions = [];
    for (let i = 0; i < stateTasks.length; i++){
        taskDropOptions.push({label:stateTasks[i], value:taskIDs[i]});
    }

    // Set date dropdown options.
    const dateOptions = [
        {label: "Last 7 Days", value: moment().subtract(7, 'days').format('YYYY-MM-DD')},
        {label: "Last 14 Days", value: moment().subtract(14, 'days').format('YYYY-MM-DD')},
        {label: "Last 4 Weeks", value: moment().subtract(28, 'days').format('YYYY-MM-DD')},
        {label: "Last 8 Weeks", value: moment().subtract(56, 'days').format('YYYY-MM-DD')}]


    // Call components.
    return (
        <div className="app">
            {/*Nav Bar*/}
            {/*<NavBar pages={pages} name={name} pagePaths={pagePaths} adminRole={false}/>*/}

            {/*Insight at head of page.*/}
            <div className="flex-item-full">
                <h4>Today's Insight</h4>
                <h1>“80% of advanced ability students are feeling low confidence levels this week”</h1>
            </div>

            <div className="flex-container">
                <div className="flex-item-half">

                    {/*Pie Chart.*/}
                    <h3>Confidence Distribution for Specified Date</h3>
                    {/*Filter dropdown for pie chart.*/}
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
                    {/*Date dropdown for pie chart.*/}
                    <Dropdown currentOption={pieDateFilter}
                          setCurrentOption={setPieDateFilter}
                          dropOptions={[
                              {label: moment().format("DD-MM-YYYY"), value: moment().format("YYYY-MM-DD")},
                              {label: moment().subtract(1, 'd').format("DD-MM-YYYY"), value: moment(1, 'd').format("YYYY-MM-DD")},
                              {label: moment().subtract(2, 'd').format("DD-MM-YYYY"), value: moment(2, 'd').format("YYYY-MM-DD")},
                              {label: moment().subtract(3, 'd').format("DD-MM-YYYY"), value: moment(3, 'd').format("YYYY-MM-DD")},
                              {label: moment().subtract(4, 'd').format("DD-MM-YYYY"), value: moment(4, 'd').format("YYYY-MM-DD")},
                              {label: moment().subtract(5, 'd').format("DD-MM-YYYY"), value: moment(5, 'd').format("YYYY-MM-DD")},
                              {label: moment().subtract(6, 'd').format("DD-MM-YYYY"), value: moment(6, 'd').format("YYYY-MM-DD")},
                          ]}
                    />
                    {/*Pie chart, passing values from dropdowns and course from nav bar.*/}
                    <PieGraph course={course} filter={currentOptionFilter.value} date={pieDateFilter.value}/>
                </div>

                <div className="flex-item-half-stat">
                    {/*Tasks complete stat.*/}

                    {/*Task dropdown for tasks complete.*/}
                    <Dropdown currentOption={currentOptionTaskFilter}
                          setCurrentOption={setCurrentOptionTaskFilter}
                          dropOptions={taskDropOptions}
                    />

                    {/*Date filter for tasks complete.*/}
                    <Dropdown currentOption={currentOptionDateFilter}
                          setCurrentOption={setCurrentOptionDateFilter}
                          dropOptions={dateOptions}
                    />

                    {/*Tasks complete, passing values from dropdowns and course from nav bar.*/}
                    <TasksComplete course={course}
                                   date={currentOptionDateFilter.value}
                                   task={currentOptionTaskFilter.value}/>
                </div>

                <div className="flex-item-full">
                    {/*Scatter graph.*/}

                    <h3>Average Confidence VS. Average Grade</h3>
                    {/*Filter for scatter graph.*/}
                    <Dropdown currentOption={currentOptionLimitedFilter}
                          setCurrentOption={setCurrentOptionLimitedFilter}
                          dropOptions={[
                              {label: "Gender", value: "Gender"},
                              {label: "Nationality", value: "Nationality"},
                              {label: "Ability", value: "Ability"}
                          ]}
                    />
                    {/*Scatter graph, passing value from dropdown and course from nav bar.*/}
                    <ScatterGraph course={course} filter={currentOptionLimitedFilter.value}/>
                </div>

                <div className="flex-item-full">
                    {/*Line graph.*/}
                    <h3>Average Confidence Over Time</h3>
                    {/*Filter for line graph.*/}
                    <Dropdown currentOption={currentOptionDateFilter}
                              setCurrentOption={setCurrentOptionDateFilter}
                              dropOptions={dateOptions}
                    />
                    {/*Line graph, passing value from dropdown and course from nav bar.*/}
                    <LineGraph course={course} date={currentOptionDateFilter.value}/>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
}
