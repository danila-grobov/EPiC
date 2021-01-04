import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import "./app.scss";

function CounterExample() {
    const[count, setCount] = useState(0);
    const[clean, setClean] = useState("not clean");

    useEffect(() => {
        function doTitleChange() {
            let title = "Dick heads!";
            if (count > 0){
                title = "You've clicked " + count + " times";
            }
            document.title = title;
        }

        let ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
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

        doTitleChange();

        return function cleanup() {
            setClean("very clean");
        };
    });

    return (
        <div>
            <p>you've clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}>Click me shit head</button>
            <p>{clean} -> {count}</p>
            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow"/>
            </svg>

            <svg width="400" height="100">
                <rect width="400" height="100" stroke="blue" strokeWidth="4" fill="green"/>
            </svg>

            <canvas id="myChart" width="400" height="100"/>

        </div>
    );
}

export default CounterExample;