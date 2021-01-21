import "../scss/teacherPage.scss";

import React, {useEffect, useState} from "react";
import PieGraph from "./PieGraph";
import ScatterGraph from "./ScatterGraph";
import LineGraph from "./LineGraph";
import Dropdown from "../general_components/Dropdown";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import TasksComplete from "./TasksComplete";

export default () => {
    const pages = ["CSC2031", "CSC2032", "CSC2033", "CSC2034"];
    const titleFilter = {label: "Filter", value: "Filter"};
    const [currentOptionFilter, setCurrentOptionFilter] = useState(titleFilter);

    const titleDateFilter = {label: "Date", value: "Date"};
    const [currentOptionDateFilter, setCurrentOptionDateFilter] = useState(titleDateFilter);

    const titleTaskFilter = {label: "Task", value: "Task"};
    const [currentOptionTaskFilter, setCurrentOptionTaskFilter] = useState(titleTaskFilter);

    const titleLimitedFilter = {label: "Filter", value: "Filter"};
    const [currentOptionLimitedFilter, setCurrentOptionLimitedFilter] = useState(titleLimitedFilter);

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
                              {label: "All Students", value: "All Students"},
                              {label: "UK Students", value: "UK Students"},
                              {label: "EU Students", value: "EU Students"},
                              {label: "International Students", value: "International Students"},
                              {label: "Men", value: "Men"},
                              {label: "Women", value: "Women"},
                              {label: "Non-Binary", value: "Non-Binary"},
                              {label: "Advanced Ability", value: "Advanced Ability"},
                              {label: "Intermediate Ability", value: "Intermediate Ability"},
                              {label: "Beginner Ability", value: "Beginner Ability"}
                          ]}
                    />
                    <Dropdown currentOption={currentOptionDateFilter}
                          setCurrentOption={setCurrentOptionDateFilter}
                          dropOptions={[
                              {label: "Date 1", value: "Date 1"},
                              {label: "Date 2", value: "Date 2"}
                          ]}
                    />
                    <PieGraph />
                </div>

                <div className="flex-item-half">
                    <Dropdown currentOption={currentOptionTaskFilter}
                          setCurrentOption={setCurrentOptionTaskFilter}
                          dropOptions={[
                              {label: "Task 1", value: "Task 1"},
                              {label: "Task 2", value: "Task 2"}
                          ]}
                    />
                    <Dropdown currentOption={currentOptionDateFilter}
                          setCurrentOption={setCurrentOptionDateFilter}
                          dropOptions={[
                              {label: "Date 1", value: "Date 1"},
                              {label: "Date 2", value: "Date 2"}
                          ]}
                    />
                    <TasksComplete />
                </div>

                <div className="flex-item-full">
                    <h3>Average Confidence VS. Average Grade</h3>
                    <Dropdown currentOption={currentOptionLimitedFilter}
                          setCurrentOption={setCurrentOptionLimitedFilter}
                          dropOptions={[
                              {label: "Gender", value: "Gender"},
                              {label: "Nationality", value: "Nationality"},
                              {label: "Ability", value: "Ability"},
                              {label: "Confidence", value: "Confidence"}
                          ]}
                    />
                    <ScatterGraph
                        ukXVals={[1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,4,5,5,5,5]} ukYVals={[10,15,40,20,29,60,54,43,54,65,38,58,62,70,75,67,80,45,89,91,100]}
                        euXVals={[1,2,2,2,2,3,3,4,4,4,4,4,4,5,5,5,5,5,5]} euYVals={[20,28,39,48,45,49,41,56,68,81,50,47,42,90,87,99,72,79,72]}
                        inXVals={[2,2,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5]} inYVals={[45,34,47,39,43,69,76,68,56,80,72,78,90,98,84,77,100]} />
                </div>
                <div className="flex-item-full">
                    <h3>Average Confidence Over Time</h3>
                    <Dropdown currentOption={currentOptionDateFilter}
                              setCurrentOption={setCurrentOptionDateFilter}
                              dropOptions={[
                                  {label: "Date 1", value: "Date 1"},
                                  {label: "Date 2", value: "Date 2"}
                              ]}
                    />
                    <LineGraph title={'Average Confidence'}
                               labels={['28/12/2020', '29/12/2020', '30/12/2020', '31/12/2020', '01/01/2021', '04/01/2021', '05/01/2021', '06/01/2021', '07/01/2021', '08/01/2021']}
                               values={[2.2, 4.1, 3.9, 1.2, 2, 3.3, 1.5, 3.5, 4.2, 4.5]} />
                </div>
            </div>


            <ToastContainer />
        </div>
    );
}