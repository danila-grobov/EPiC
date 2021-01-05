import React, {useEffect} from "react";
import Chart from 'chart.js';

function BarGraph({labels, seriesLabel, values}) {

    function GenColours() {
        const colors = new Array(values.length)
        for (let i = 0; i < values.length; i++){
            colors[i] = 'rgba('+Math.floor(Math.random() * Math.floor(255))+','
                +Math.floor(Math.random() * Math.floor(255))+','+Math.floor(Math.random() * Math.floor(255))+',1';
        }

        return colors;
    }

    useEffect(() => {
        const colors = GenColours;
        let ctx = document.getElementById('barGraph');
        let graph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: seriesLabel,
                    data: values,
                    backgroundColor: colors,
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