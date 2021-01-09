import React, {useEffect} from "react";
import Chart from 'chart.js';

export default ({data}) => {

    useEffect(() => {
        let ctx = document.getElementById('PieChart');
        let PieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(110,179,206,0.8)',
                        'rgba(142,201,154,0.8)',
                        'rgba(242,143,56,0.8)',
                        'rgba(200,85,61,0.8)',
                        'rgb(122,48,108,0.8)'
                    ],
                    borderColor: [
                        'rgb(110,179,206,1)',
                        'rgba(142,201,154,1)',
                        'rgba(242,143,56,1)',
                        'rgba(200,85,61,1)',
                        'rgb(122,48,108,1)'
                    ],
                    borderWidth: 1,
                    hoverBorderWidth: 4
                }],

                labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
            }
            //options: options
        });
    })

    return (
        <div>
            <canvas id="PieChart" width="400" height="100"/>
        </div>
    );
}