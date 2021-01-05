import React, {useEffect, useState} from "react";
import BarGraph from "./BarGraph";
import Options from "./Options";
import Button from "../general_components/Button";
import ScatterGraph from "./ScatterGraph";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";

// Create canvas for graph to be displayed
// Choose graph to display, with any filters
// Call relevant graph component passing data

export default () => {

    // Set to false on first render before a graph is selected
    let displayGraph = true;

    // Bar Graph data
    const labels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 6'];
    const seriesLabel = 'Confidence';
    const values = [10, 30, 80, 110, 90];
    // Result from drop down sets one of these four to true
    let displayBar = false;

    // Scatter Graph data
    const xVals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    const yVals = [50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    let displayScatter = false;

    // Line Graph data
    const lineLabels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
    const avgNumAtEachLevel = [10, 30, 80, 110, 90];
    let displayLine = false;


    // Pie Graph data
    let displayPie = true;
    const dataLabels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
    const pieData = [10, 30, 80, 110, 90];


    return (
        <div>
            <h2>Here's a graph</h2><br/>

            {/* Graphs */}

            {displayGraph === true && displayBar === true &&
                <BarGraph labels={labels} seriesLabel={seriesLabel} values={values} />
            }

            {displayGraph === true && displayScatter === true &&
                <ScatterGraph xValues={xVals} yValues={yVals}/>
            }

            {displayGraph === true && displayLine === true &&
                <LineGraph labels={lineLabels} yValues={avgNumAtEachLevel}/>
            }

            {displayGraph === true && displayPie === true &&
                <PieGraph dataLabels={dataLabels} data={pieData}/>
            }

            {/* Options/ filter menu */}
            <Options />

            {/* Get Button from general_components to re-render once filters and graph selected */}
            <Button label={"Re-Render"} />
        </div>
    )
}
