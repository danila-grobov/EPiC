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

            const daysPrev = moment().diff(moment(date, "YYYY-MM-DD"), 'days');
            const step = Math.round(daysPrev/7) === 0 ? 1 : Math.round(daysPrev/7);

            let dateLabels = new Array(daysPrev);
            let values = new Array(daysPrev);
            dateLabels.fill("");
            values.fill(0);


            for (const dateKey in valuesDict){
                console.log(moment().diff(moment("2021-01-23", "YYYY-MM-DD"), 'days'));

                let position = null;
                if (moment().isSame(dateKey, 'day')){
                    position = 0
                    console.log(position);
                } else {
                    position = moment().diff(moment(dateKey, "YYYY-MM-DD"), 'days') - 1
                }


                values[daysPrev-position-1] = valuesDict[dateKey];
            }
            console.log(values);

            for (let i = 0; i < daysPrev; i++){
                if (i % step === 0){
                    dateLabels[i] = moment().subtract(daysPrev-i-1, 'd').format("DD-MM-YYYY");
                }
            }


            lineGraph.data.datasets[0].data = values;
            lineGraph.data.labels = dateLabels;
            lineGraph.data.datasets[0].backgroundColor = new Array(3).fill('rgba(197,109,181, 0.5)')
            lineGraph.data.datasets[0].borderColor = new Array(3).fill('rgba(197,109,181, 0.5)')
            lineGraph.update();

        })

    }, [date, course])

    return (
        // Define canvas element to contain the graph.
        <div>
            <canvas id="lineGraph" width="400" height="150"/>
        </div>
    );
}