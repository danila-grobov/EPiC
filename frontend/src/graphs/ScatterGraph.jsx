import React, {useEffect} from "react";
import Chart from 'chart.js';

// Parameters: X and Y values for three datasets.
export default ({ukXVals, ukYVals, euXVals, euYVals, inXVals, inYVals})  => {

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

    useEffect(() => {
        // Initialise chart object, passing in the canvas element.
        const scatterChart = new Chart(document.getElementById('scatterGraph'), {
            // Set type of graph.
            type: 'scatter',
            data: {
                // Three datasets one for each set of parameters.
                datasets: [{
                    // Sets series label
                    label: "UK",
                    // Call function to generate points.
                    data: generatePoints(ukXVals, ukYVals),
                    // Set colour for each point.
                    backgroundColor: new Array(ukXVals.length).fill('rgba(110,179,206, 1)'),
                    borderWidth: 1
                },
                {
                    label: "EU",
                    data: generatePoints(euXVals, euYVals),
                    backgroundColor: new Array(euXVals.length).fill('rgba(142,201,154, 1)'),
                    borderWidth: 1
                },
                {
                    label: "International",
                    data: generatePoints(inXVals, inYVals),
                    backgroundColor: new Array(inXVals.length).fill('rgba(122,48,108, 1)'),
                    borderWidth: 1
                }]
            },
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
    })

    return (
        // Define canvas element to contain the graph.
        <div>
            <canvas id="scatterGraph" width="400" height="150"/>
        </div>
    );
}
