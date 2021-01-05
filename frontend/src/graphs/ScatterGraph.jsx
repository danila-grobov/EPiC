import React, {useEffect} from "react";
import Chart from 'chart.js';


function ScatterGraph(xValues, yValues) {
    let xVals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    let yVals = [50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];

    function generatePoints() {
        let pointsString = new Array(xVals.length);
        for (let i = 0; i < xVals.length; i++){
            pointsString[i] = {x: xVals[i], y: yVals[i]};
        }

        return pointsString;
    }

    function randomColorNumber() {
        return Math.floor(Math.random() * Math.floor(255));
    }

    useEffect(() => {
        let ctx = document.getElementById('scatterGraph');
        let scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Scatter Dataset',
                    data: generatePoints(),
                    backgroundColor: new Array(xVals.length).fill('rgba('+randomColorNumber()+','+randomColorNumber()+','+randomColorNumber()+', 0.2)'),
                    borderColor: new Array(xVals.length).fill('rgba('+randomColorNumber()+','+randomColorNumber()+','+randomColorNumber()+', 1)'),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        });
    })

    return (
        <div>
            <canvas id="scatterGraph" width="400" height="100"/>
        </div>
    );
}

export default ScatterGraph;