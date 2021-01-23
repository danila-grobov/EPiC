import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import axios from "axios";

// Parameters: Series title, labels for X axis, values to populate graph.
export default ({course, date}) => {

    const [confidence, setConfidence] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        axios.get('/api/t/line', {
            params: {
                course: "CSC2031",
                date: "2021-01-01"
            }
        }).then(res => {
            setConfidence(res.data.confidenceVals);
            setDates(res.data.CDates);
        })

        console.log("Dates from DB: " + dates);
        console.log("Confidence from DB: " + confidence);

        const valuesDict = {};
        const conCount = [0,0,0,0,0];

        for (let i = 0; i < dates.length; i++){
            if (!(dates[i] in valuesDict)){
                valuesDict[dates[i]] = confidence[i];
                conCount[confidence[i]] ++;
            } else {
                valuesDict[dates[i]] = valuesDict[dates[i]] + (confidence[i]);
                conCount[confidence[i]] ++;
            }
        }

        const valuesArr = [];
        const labelsArr = [];
        for (let i = 0; i < valuesDict.length; i++){
            valuesArr.push(valuesDict[i] / conCount[i]);
            labelsArr.push(valuesDict.key);
        }

        console.log(valuesArr);
        console.log(labelsArr);

        // Initialise chart object, passing in the canvas element.
        const graph = new Chart(document.getElementById('lineGraph'), {
            // Define type of chart.
            type: 'line',
            data: {
                // Set labels for X axis.
                labels: labelsArr,
                datasets: [{
                    // One data set, set title of dataset and values.
                    label: "Average Confidence Over Time",
                    data: valuesArr,
                    // Set colours for points.
                    backgroundColor: new Array(valuesArr.length).fill('rgba(197,109,181, 0.5)'),
                    borderColor: new Array(valuesArr.length).fill('rgba(197,109,181, 0.5)'),
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
    })

    return (
        // Define canvas element to contain the graph.
        <div>
            <canvas id="lineGraph" width="400" height="150"/>
        </div>
    );
}