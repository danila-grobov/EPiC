import React, {useEffect, useState} from "react";
import BarGraph from "./BarGraph";
import Options from "./Options";
import Button from "../general_components/Button";

// Create canvas for graph to be displayed
// Choose graph to display, with any filters
// Call relevant graph component passing data

export default () => {


    let displayGraph = true;
    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    const seriesLabel = 'A bar graph';
    const values = [2, 19, 3, 5, 2, 3];


    return (
        <div>
            <h2>Here's a graph</h2><br/>


            {displayGraph === true &&
                <BarGraph labels={labels} seriesLabel={seriesLabel} values={values} />
            }

            <Options />


            {/*Get Button from general_components to re-render once filters selected*/}
            <Button label={"Re-Render"} />
        </div>
    )
}
