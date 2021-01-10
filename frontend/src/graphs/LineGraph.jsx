import React, {useEffect} from "react";
import Chart from 'chart.js';

export default ({title, labels, values}) => {

    useEffect(() => {
        let ctx = document.getElementById('lineGraph');
        let graph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: values,
                    backgroundColor: new Array(values.length).fill('rgba(197,109,181, 0.5)'),
                    borderColor: new Array(values.length).fill('rgba(197,109,181, 0.5)'),
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 5
                        }
                    }]
                }
            }
        });
    })

    return (
        <div>
            <canvas id="lineGraph" width="400" height="150"/>
        </div>
    );
}