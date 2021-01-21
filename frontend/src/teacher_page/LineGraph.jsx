import React, {useEffect} from "react";
import Chart from 'chart.js';
import axios from "axios";

// Parameters: Series title, labels for X axis, values to populate graph.
export default ({course, date}) => {

    useEffect(() => {

        axios.get('/api/t/line', {
            params: {
                course: course,
                date: date
            }
        }).then(res => {
            // GET DATA

        })

        // THEN GENERATE AVERAGE FOR EACH DATE


        /*
        // Initialise chart object, passing in the canvas element.
        const graph = new Chart(document.getElementById('lineGraph'), {
            // Define type of chart.
            type: 'line',
            data: {
                // Set labels for X axis.
                labels: "", // DATES
                datasets: [{
                    // One data set, set title of dataset and values.
                    label: "Average Confidence Over Time",
                    data: values, // DATA
                    // Set colours for points.
                    backgroundColor: new Array(values.length).fill('rgba(197,109,181, 0.5)'),
                    borderColor: new Array(values.length).fill('rgba(197,109,181, 0.5)'),
                    borderWidth: 1,
                }]
            },
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
         */

    })

    return (
        // Define canvas element to contain the graph.
        <div>
            <canvas id="lineGraph" width="400" height="150"/>
        </div>
    );
}