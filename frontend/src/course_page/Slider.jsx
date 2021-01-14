import React, {useState, useEffect, useRef} from "react";
import "../scss/slider.scss";
import Draggable from 'react-draggable';
import happy from "../imgs/happy.svg";
import smiling from "../imgs/smiling.svg";
import confused from "../imgs/confused.svg";
import sad from "../imgs/sad.svg";
import unhappy from "../imgs/unhappy.svg";

export default props => {
    const [trackProps, setTrackProps] = useState(null);
    const sliderTrack = useRef(null);
    const {selectedOption, setSelectedOption} = props;
    useEffect(() => {
        setTrackProps(sliderTrack.current.getClientRects()[0]);
    }, []);
    const gridSize = trackProps ? trackProps.width * 0.25 : 0;
    return (
        <div className={`slider__wrapper`}>
            <div className="slider" onClick={e => {
                const option = Math.round((e.clientX - trackProps.left) / gridSize);
                setSelectedOption(Math.max(0,Math.min(option, 4)));
            }}>
                <div className="slider__track" ref={sliderTrack} />
                <div className="slider__bar" style={{width: selectedOption * gridSize}}/>
                <Draggable axis={"x"} bounds={"parent"} grid={[gridSize, 0]}
                           position={{x:selectedOption * gridSize,y:0}}
                           onDrag={(e, data) => setSelectedOption(data.x / gridSize)}>
                    <div className="slider__handle"/>
                </Draggable>
            </div>
            <div className="slider__icons">
                <img src={unhappy} alt="unhappy face" className="slider__icon"/>
                <img src={sad} alt="sad face" className="slider__icon"/>
                <img src={confused} alt="confused face" className="slider__icon"/>
                <img src={smiling} alt="smiling face" className="slider__icon"/>
                <img src={happy} alt="happy face" className="slider__icon"/>
            </div>
        </div>

    );
}