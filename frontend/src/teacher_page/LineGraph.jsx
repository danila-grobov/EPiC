/**
 * Author: Jake Hobbs
 */

import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import axios from "axios";
import moment from "moment";

let lineGraph = null;

// Parameters: Series title, labels for X axis, values to populate graph.
export default ({course, date}) => {
    useEffect(() => {
        // Initialise chart object, passing in the canvas element.
        lineGraph = new Chart(document.getElementById('lineGraph'), {
            // Define type of chart.
            type: 'line',
            data: {
                // Set labels for X axis.
                labels: [],
                datasets: [{
                    // One data set, set title of dataset and values.
                    label: "Average Confidence Over Time",
                    data: [],
                    borderWidth: 1,
                }]
            },
            // Formatting graph.
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            // Set range of Y axis
                            beginAtZero: true,
                            max: 5
                        }
                    }]
                }
            }
        });
    }, [])

    useEffect(() => {
        console.log(date);
        // Call to database, passing conditions.
        axios.get('/api/t/line', {
            params: {
                course: course,
                date: date
            }
        }).then(({data}) => {
            console.log("LINE CON VALS " + data.confidenceVals);
            console.log("LINE DATE VALS " + data.CDates);
            // Set state values.

            // Separate data into dates and corresponding confidence values.
            let valuesDict = {};
            for (let i = 0; i < data.CDates.length; i++) {
                if (!(data.CDates[i] in valuesDict)) {
                    valuesDict[data.CDates[i]] = [data.confidenceVals[i]];
                } else {
                    valuesDict[data.CDates[i]].push((data.confidenceVals[i]));
                }
            }

            for (const dateKey in valuesDict){
                const sum = valuesDict[dateKey].reduce((prev, current) => prev+current, 0);
                valuesDict[dateKey] = sum / valuesDict[dateKey].length;
            }

            console.log(date);
            const daysPrev = moment().diff(moment(date, "YYYY-MM-DD"), 'days');
            const step = daysPrev/7;
            let dateLabels = new Array(daysPrev);
            let values = new Array(daysPrev);
            dateLabels.fill("");
            values.fill(0);

            console.log(daysPrev);

            for (const dateKey in valuesDict){
                const position = moment().diff(moment(dateKey, "YYYY-MM-DD"), 'days');
                values[position] = valuesDict[dateKey];
            }

            for (let i = 0; i < daysPrev; i+=step){
                dateLabels[i] = moment().subtract(56-i, 'd').format("DD-MM-YYYY");
            }


            lineGraph.data.datasets[0].data = values;
            lineGraph.data.labels = dateLabels;
            lineGraph.data.datasets[0].backgroundColor = new Array(3).fill('rgba(197,109,181, 0.5)')
            lineGraph.data.datasets[0].borderColor = new Array(3).fill('rgba(197,109,181, 0.5)')
            lineGraph.update();

            console.log(lineGraph);
        })

    }, [date])

    return (
        // Define canvas element to contain the graph.
        <div>
            <canvas id="lineGraph" width="400" height="150"/>
        </div>
    );
}