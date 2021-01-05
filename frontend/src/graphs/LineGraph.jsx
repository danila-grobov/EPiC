import React, {useEffect} from "react";
import Chart from 'chart.js';

function LineGraph() {

    useEffect(() => {
        let ctx = document.getElementById('lineGraph');
        let graph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'A line graph',
                    data: [2, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(3,3,3, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Another line graph',
                    data: [9, 6, 5, 1, 12, 4],
                    backgroundColor: [
                        'rgba(121,12,35,0.2)',
                        'rgba(13,82,129,0.2)',
                        'rgba(95,70,11,0.2)',
                        'rgba(9,119,119,0.2)',
                        'rgba(45,8,117,0.2)',
                        'rgba(119,63,8,0.2)'
                    ],
                    borderColor: [
                        'rgba(121,12,35,1)',
                        'rgba(13,82,129,1)',
                        'rgba(95,70,11,1)',
                        'rgba(9,119,119,1)',
                        'rgba(45,8,117,1)',
                        'rgba(119,63,8,1)'
                    ],
                    borderWidth: 2
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
            <canvas id="lineGraph" width="400" height="100"/>
        </div>
    );
}

export default LineGraph;