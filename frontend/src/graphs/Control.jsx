import React, {useEffect, useState} from "react";
import BarGraph from "./BarGraph";
import Options from "./Options";
import Button from "../general_components/Button";
import ScatterGraph from "./ScatterGraph";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";

export default () => {

    //For testing, value will be returned from drop down menu
    //////////
    //Change this to view different graphs
    const choice = 7;

    let graphTitle = "Here's a graph"

    //Initialise all variables passed to graphs
    let labels = null
    let values = null
    let seriesLabel = null;
    let displayBar = false;

    let xVals = null;
    let yVals = null;
    let scatterSeriesLabel = null;
    let displayScatter = false;

    let lineLabels = null;
    let avgNumAtEachLevel = null;
    let displayLine = false;

    let dataLabels = null;
    let pieData = null;
    let displayPie = false;

    if (choice === 1) { //Raw grade
        graphTitle = "Raw Grade"
        labels = ['<10%', '10%-20%', '20%-30%', '30%-40%', '40%-50%', '50%-60%', '60%-70%', '70%-80%', '80%-90%', '90%-100%'];
        // Get from what module/etc. the teacher's looking at
        seriesLabel = '**Insert Cohort/Module**';
        values = [0, 1, 3, 6, 50, 60, 80, 90, 70, 20];
        displayBar = true;

    } else if (choice === 2) { //Number of tasks completed in a period
        graphTitle = "Number of Tasks Completed"
        //Calculate labels from tasks available and tasks done
        labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        seriesLabel = '**Insert Cohort/Module**';
        // Calculated in tandem with labels so they match
        values = [0, 1, 3, 6, 50, 60, 80, 90, 70, 20, 15];
        displayBar = true;

    } else if (choice === 3) { //Current confidence level
        graphTitle = "Average Confidence Level To Date"
        labels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
        seriesLabel = '**Insert Cohort/Module**';
        // Calculated from start of module to most recent data and averaged for each student to get average for module.
        values = [10, 20, 40, 200, 100];
        displayBar = true;

    } else if (choice === 4) { //Grade distribution
        graphTitle = "Grade Distribution"
        // Can be replaced with more relevant grades?
        labels = ['Fail', '3rd', '2:2', '2:1', '1st'];
        seriesLabel = '**Insert Cohort/Module**';
        // Calculated from raw grade?
        values = [10, 20, 40, 200, 100];
        displayBar = true;

    } else if (choice === 5) { //Confidence v.s. grade
        graphTitle = "Confidence V.S. Grade";
        xVals = [1,3,1,5,4,4,4,5,4,1,5,1,5,2,4,3,4,4,4,3,5,5,5,5,3,5,4,2,2,5,3,2,4,3,3,4,1,2,4,2,5,5,5,4,1,3,4,3,1,1];
        yVals = [84,61,67,67,28,28,62,55,16,96,52,55,95,87,10,73,59,69,42,30,12,70,1,26,46,88,94,4,92,89,49,3,1,72,36,5,25,50,19,6,21,16,6,29,5,20,71,2,7,93];
        scatterSeriesLabel = "**Insert Cohort/Module**";
        displayScatter = true;

    } else if (choice === 6) { //Average confidence over a period
        graphTitle = "Average confidence over ____ Period";
        lineLabels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
        avgNumAtEachLevel = [10, 30, 80, 110, 90];
        displayLine = true;

    } else if (choice === 7) { //Confidence for a specific date
        graphTitle = "Confidence for __/__/____";
        dataLabels= ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
        pieData = [10, 30, 80, 110, 90];
        displayPie = true;
    }


    return (
        <div>
            <h2>{graphTitle}</h2><br/>

            {displayBar === true &&
                <BarGraph labels={labels} seriesLabel={seriesLabel} values={values} />
            }

            {displayScatter === true &&
                <ScatterGraph xValues={xVals} yValues={yVals} seriesLabel={scatterSeriesLabel}/>
            }

            {displayLine === true &&
                <LineGraph labels={lineLabels} yValues={avgNumAtEachLevel}/>
            }

            {displayPie === true &&
                <PieGraph dataLabels={dataLabels} data={pieData}/>
            }

            {/* Options/ filter menu */}
            <Options />

            {/* Get Button from general_components to re-render once filters and graph selected */}
            <Button label={"Re-Render"} />
        </div>
    )
}
