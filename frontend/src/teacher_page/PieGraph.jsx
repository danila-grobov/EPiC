/**
 * @author Jake Hobbs
 */

import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import axios from "axios";

/**
 * Pie chart component for displaying confidence distribution on teacher page,
 * query database with filters applied then update chart with retrieved data.
 */

let pieChart = null;

// Parameters passed in: will filter results in SQL query.
export default ({course, filter, date}) => {

    // Initialisation of chart with default values.
    useEffect(() => {
        pieChart = new Chart(document.getElementById('PieChart'), {
            // Set type of graph.
            type: 'doughnut',
            data: {
                datasets: [{
                    // One dataset, set data passed in.
                    data: [0,0,0,0,0],
                    // Set colours for each segment.
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
                    // Widen border when hovering over a segment.
                    hoverBorderWidth: 4
                }],
                // Set labels.
                labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
            }
        })
    },[])

    // Get data from database and update pie chart.
    useEffect(() => {
        // Call to database, passing parameters.
        axios.get('/api/t/pie', {
            params: {
                course: course,
                filter: filter,
                date: date
            }
        }).then(({data}) => {
            // Get count for each confidence value and add to array.
            const confidenceSplit = [0,0,0,0,0];
            for (let i = 0; i < data.length; i++){
                if (data[i] === 0){
                    confidenceSplit[0] ++;
                } else if (data[i] === 1){
                    confidenceSplit[1] ++;
                } else if (data[i] === 2){
                    confidenceSplit[2] ++;
                } else if (data[i] === 3){
                    confidenceSplit[3] ++;
                } else if (data[i] === 4){
                    confidenceSplit[4] ++;
                }
            }

            // Update chart with new data.
            pieChart.data.datasets[0].data = confidenceSplit;
            pieChart.update();

    }, [filter, date])
    })

    return (
        // Define canvas element to contain graph.
        <div>
            <canvas id="PieChart" width="400" height="250"/>
        </div>
    );
}
