import React, {useEffect} from "react";
import Chart from 'chart.js';


function ScatterGraph({ukXVals, ukYVals, euXVals, euYVals, inXVals, inYVals}) {

    function generatePoints(xVals, yVals) {
        let pointsString = new Array(xVals.length);
        for (let i = 0; i < xVals.length; i++){
            pointsString[i] = {x: xVals[i], y: yVals[i]};
        }

        return pointsString;
    }

    useEffect(() => {
        let ctx = document.getElementById('scatterGraph');
        let scatterChart = new Chart(ctx, {
            type: 'scatter',
            title: true,
            data: {
                datasets: [{
                    label: "UK",
                    data: generatePoints(ukXVals, ukYVals),
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
                            beginAtZero: false,
                            stepSize: 1
                        }
                    }],
                    yAxes: [{
                       type: 'linear',
                       position: 'bottom',
                       ticks: {
                           beginAtZero: true,
                           stepSize: 5
                       }
                    }]
                }
            }
        });
    })

    return (
        <div>
            <canvas id="scatterGraph" width="400" height="150"/>
        </div>
    );
}

export default ScatterGraph;