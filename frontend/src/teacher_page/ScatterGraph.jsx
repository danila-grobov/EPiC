/**
 * @author Jake Hobbs
 */

import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import axios from "axios";

/**
 * Scatter graph component, get confidence and grade values from EPiC database and update chart.
 * ** INCOMPLETE **
 */

// Parameters: X and Y values for three datasets.
export default ({course, filter})  => {

    // Function to generate the points on the graph using the data passed in as parameters.
    function generatePoints(xVals, yVals) {
        // Initialise empty array with length of the passed in arrays.
        let points = new Array(xVals.length);
        for (let i = 0; i < xVals.length; i++){
            // Update array with an object for each point.
            points[i] = {x: xVals[i], y: yVals[i]};
        }
        return points;
    }

    const [gotValues, setGotValues] = useState([]);

    useEffect(() => {
        // Call to database.
        axios.get('/api/t/scatter', {
            params: {
                course: course,
                filter: filter,
            }
        }).then(({data}) => {
            // Set values from DB to state.
            setGotValues(data.scatValues);
        })

        // Initialise empty arrays for X and Y values for the three data sets.
        let conVals1 = [];
        let gradeVals1 = [];
        let conVals2 = [];
        let gradeVals2 = [];
        let conVals3 = [];
        let gradeVals3 = [];

        // Take values from state, split into three data sets and X and Y values.
        for (let i = 0; i < gotValues.length; i++){
            if (gotValues[i][2] === "Male" || gotValues[i][2] === "UK Students" || gotValues[i][2] === "Advanced"){
                conVals1.push(gotValues[i][0]);
                gradeVals1.push(gotValues[i][1]);
            } else if (gotValues[i][2] === "Female" || gotValues[i][2] === "EU Students" || gotValues[i][2] === "Intermediate"){
                conVals2.push(gotValues[i][0]);
                gradeVals2.push(gotValues[i][1]);
            } else if (gotValues[i][2] === "Non-Binary" || gotValues[i][2] === "International Students" || gotValues[i][2] === "Beginner"){
                conVals3.push(gotValues[i][0]);
                gradeVals3.push(gotValues[i][1]);
            }
        }

        // Set labels, dependant on filter.
        let labels = []
        if (filter === "Gender"){
            labels = ["Male", "Female", "Non-Binary"];
        } else if (filter === "Nationality"){
            labels = ["UK", "EU", "International"];
        } else if (filter === "Ability"){
            labels = ["Advanced", "Intermediate", "Beginner"];
        }

        // Initialise chart object, passing in the canvas element.
        const scatterChart = new Chart(document.getElementById('scatterGraph'), {
            // Set type of graph.
            type: 'scatter',
            data: {
                // Three datasets one for each set of parameters.
                datasets: [{
                    // Data set 1
                    // Sets series label
                    label: labels[0],
                    // Call function to generate points.
                    data: generatePoints(conVals1, gradeVals1),
                    // Set colour for each point.
                    backgroundColor: new Array(conVals1.length).fill('rgba(110,179,206, 1)'),
                    borderWidth: 1
                },
                {
                    // Data set 2
                    label: labels[1],
                    data: generatePoints(conVals2, gradeVals2),
                    backgroundColor: new Array(conVals2.length).fill('rgba(142,201,154, 1)'),
                    borderWidth: 1
                },
                {
                    // Data set 3
                    label: labels[2],
                    data: generatePoints(conVals3, gradeVals3),
                    backgroundColor: new Array(conVals3.length).fill('rgba(122,48,108, 1)'),
                    borderWidth: 1
                }]
            },
            // Formatting of graph
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            // Start at one (first confidence level).
                            beginAtZero: false,
                            stepSize: 1
                        }
                    }],
                    yAxes: [{
                       type: 'linear',
                       position: 'bottom',
                       ticks: {
                           beginAtZero: true,
                           // Ascend in steps of 5.
                           stepSize: 5
                       }
                    }]
                }
            }
        });
    }, [])

    return (
        // Define canvas element to contain the graph.
        <div>
            <canvas id="scatterGraph" width="400" height="150"/>
        </div>
    );
}
