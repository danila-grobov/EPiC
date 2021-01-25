/**
 * @author Jake Hobbs
 */

import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import axios from "axios";
import moment from "moment";

/**
 * Line graph component for displaying average confidence over time on teacher page.
 * Query database then update line graph with retrieved confidence data.
 */

let lineGraph = null;

// Pass values that will be used to filter the data.
export default ({course, date}) => {
    // Initialisation of chart with default values.
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

    // Get data from database using passed parameters to filter.
    useEffect(() => {
        // Call to database, passing conditions.
        axios.get('/api/t/line', {
            params: {
                course: course,
                date: date
            }
        }).then(({data}) => {
            // Set state values.

            // Separate data into dates and corresponding confidence values.
            // Result is an object with dates as keys and a list of confidence values (integers) as a values.
            let valuesDict = {};
            for (let i = 0; i < data.CDates.length; i++) {
                if (!(data.CDates[i] in valuesDict)) {
                    valuesDict[data.CDates[i]] = [data.confidenceVals[i]];
                } else {
                    valuesDict[data.CDates[i]].push((data.confidenceVals[i]));
                }
            }

            // Calculate average of that list of confidence values.
            // Average value then replaces list in key, value object.
            for (const dateKey in valuesDict){
                const sum = valuesDict[dateKey].reduce((prev, current) => prev+current, 0);
                valuesDict[dateKey] = sum / valuesDict[dateKey].length;
            }

            // Calculate steps between dates displayed on X Axis.
            // Get number of days between today and passed date.
            const daysPrev = moment().diff(moment(date, "YYYY-MM-DD"), 'days');
            // Calculate step.
            const step = Math.round(daysPrev/7) === 0 ? 1 : Math.round(daysPrev/7);
            // Initialise new arrays.
            let dateLabels = new Array(daysPrev);
            let values = new Array(daysPrev);
            dateLabels.fill("");
            values.fill(0);


            // Add dates to values array, complying with step.
            for (const dateKey in valuesDict){
                let position = null;
                // Check if dateKey is today, set position accordingly.
                if (moment().isSame(dateKey, 'day')){
                    position = 0
                } else {
                    position = moment().diff(moment(dateKey, "YYYY-MM-DD"), 'days') - 1
                }
                // Update values array with.
                values[daysPrev-position-1] = valuesDict[dateKey];
            }

            // Set labels, only where needed.
            for (let i = 0; i < daysPrev; i++){
                if (i % step === 0){
                    dateLabels[i] = moment().subtract(daysPrev-i-1, 'd').format("DD-MM-YYYY");
                }
            }


            // Update chart, with values and colours.
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