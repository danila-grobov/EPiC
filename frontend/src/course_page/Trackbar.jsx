/**
 * @author Danila Grobov
 */
import React, {useState, useEffect, useRef} from "react";
import "../scss/trackbar.scss";
import Draggable from 'react-draggable';
import happy from "../imgs/happy.svg";
import smiling from "../imgs/smiling.svg";
import confused from "../imgs/confused.svg";
import sad from "../imgs/sad.svg";
import unhappy from "../imgs/unhappy.svg";

/**
 * Displays a trackbar.
 */
export default props => {
    const [trackProps, setTrackProps] = useState(null);
    const sliderTrack = useRef(null);
    const {selectedOption, setSelectedOption} = props;
    useEffect(() => {
        setTrackProps(sliderTrack.current.getClientRects()[0]);
    }, []);
    const gridSize = trackProps ? trackProps.width * 0.25 : 0;
    return (
        <div className={`trackbar__wrapper`}>
            <div className="trackbar" onClick={e => {
                const option = Math.round((e.clientX - trackProps.left) / gridSize);
                setSelectedOption(Math.max(0,Math.min(option, 4)));
            }}>
                <div className="trackbar__track" ref={sliderTrack} />
                <div className="trackbar__bar" style={{width: selectedOption * gridSize}}/>
                <Draggable axis={"x"} bounds={"parent"} grid={[gridSize, 0]}
                           position={{x:selectedOption * gridSize,y:0}}
                           onDrag={(e, data) => setSelectedOption(data.x / gridSize)}>
                    <div className="trackbar__handle"/>
                </Draggable>
            </div>
            <div className="trackbar__icons">
                <img src={unhappy} alt="unhappy face"/>
                <img src={sad} alt="sad face"/>
                <img src={confused} alt="confused face"/>
                <img src={smiling} alt="smiling face"/>
                <img src={happy} alt="happy face"/>
            </div>
        </div>

    );
};