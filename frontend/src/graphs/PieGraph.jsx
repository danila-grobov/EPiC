import React, {useEffect} from "react";
import Chart from 'chart.js';

function BarGraph({dataLabels, data}) {

    useEffect(() => {
        let ctx = document.getElementById('pieChart');
        let PieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(110,179,206,1)',
                        'rgba(142,201,154,1)',
                        'rgba(242,143,56,1)',
                        'rgba(200,85,61,1)',
                        'rgb(122,48,108,1)'
                    ],
                    borderColor: [
                        'rgb(110,179,206,1)',
                        'rgba(142,201,154,1)',
                        'rgba(242,143,56,1)',
                        'rgba(200,85,61,1)',
                        'rgb(122,48,108,1)'
                    ],
                    borderWidth: 1
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: dataLabels
            }
            //options: options
        });
    })

    return (
        <div>
            <canvas id="pieChart" width="400" height="100"/>
        </div>
    );
}

export default BarGraph;