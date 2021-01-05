import React, {useEffect} from "react";
import Chart from 'chart.js';


function ScatterGraph({xValues, yValues, seriesLabel}) {

    function generatePoints() {
        let pointsString = new Array(xValues.length);
        for (let i = 0; i < xValues.length; i++){
            pointsString[i] = {x: xValues[i], y: yValues[i]};
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
                    label: seriesLabel,
                    data: generatePoints(),
                    backgroundColor: new Array(xValues.length).fill('rgba('+randomColorNumber()+','+randomColorNumber()+','+randomColorNumber()+', 1)'),
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