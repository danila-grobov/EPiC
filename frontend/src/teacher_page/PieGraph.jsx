import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import axios from "axios";

// Parameters passed in: data to populate chart.
export default ({course, filter, date}) => {
    const [confidence, setConfidence] = useState([]);

    useEffect(() => {

        axios.get('/api/t/pie', {
            params: {
                course: course,
                filter: filter,
                date: date
            }
        }).then(({data}) => {
            setConfidence(data);
        })

        const confidenceSplit = [0,0,0,0,0];

        for (let i = 0; i < confidence.length; i++){
            if (confidence[i] === 1){
                confidenceSplit[0] ++;
            } else if (confidence[i] === 2){
                confidenceSplit[1] ++;
            } else if (confidence[i] === 3){
                confidenceSplit[2] ++;
            } else if (confidence[i] === 4){
                confidenceSplit[3] ++;
            } else if (confidence[i] === 5){
                confidenceSplit[4] ++;
            }
        }

        // Initialise chart object, passing in canvas element.
        const PieChart = new Chart(document.getElementById('PieChart'), {
            // Set type of graph.
            type: 'doughnut',
            data: {
                datasets: [{
                    // One dataset, set data passed in.
                    data: confidenceSplit,
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
        });
    }, [])

    return (
        // Define canvas element to contain graph.
        <div>
            <canvas id="PieChart" width="400" height="250"/>
        </div>
    );
}