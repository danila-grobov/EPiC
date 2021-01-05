import React, {useEffect} from "react";
import Chart from 'chart.js';

function BarGraph({labels, seriesLabel, values}) {

    useEffect(() => {
        let ctx = document.getElementById('barGraph');
        let graph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, // Array of labels
                datasets: [{
                    label: seriesLabel, // Label var
                    data: values, // Array of values
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', // Colour for each in the array
                        'rgba(54, 162, 235, 0.2)', // Randomly generated?
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255,99,132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })

    return (
        <div>
            <canvas id="barGraph" width="400" height="100"/>
        </div>
    );
}

export default BarGraph;