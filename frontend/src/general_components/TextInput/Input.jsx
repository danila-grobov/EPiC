/**
 * @author Danila Grobov
 */
import React, {useEffect, useRef, useState} from "react";
import "../../scss/textInput.scss";
import useValue from "../../hooks/useValue";

/**
 * Component responsible for displaying and controlling an input.
 */
export default props => {
    const {
        onSubmit,
        inputRef,
        width = null,
        type,
        className
    } = props;
    const {onChange, value, setValue} = getInputStates(props);
    const inputListeners = {
        onKeyDown: props.onKeyDown,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onChange: onChange
    };
    const inputType = type === "password" ? "password" : "text";
    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(value);
        setValue("");
    };
    const widthDonor = useRef(null);
    const [donorWidth, setDonorWidth] = useState(1);
    useEffect(() => {
        setDonorWidth(widthDonor.current.clientWidth + 2)
    }, [value]);
    const inputConfig = {type: inputType, ref: inputRef, value, className};
    return (
        <form onSubmit={handleSubmit}>
            <input style={{width: width ? width : donorWidth}} {...inputListeners} {...inputConfig}/>
            <span className="textInput__widthDonor" ref={widthDonor}>{value}</span>
        </form>
    );
};

/**
 * Provides an object with states for controlling an input.
 * @param props
 * @returns an object with states for controlling an input.
 */
function getInputStates(props) {
    if (props.onChange)
        return {
            onChange: props.onChange,
            value: props.value,
            setValue: props.setValue
        };
    const {onChange, value, setValue} = useValue("");
    return {
        onChange,
        value,
        setValue: e => e.target.value.length <= props.maxLength ? setValue(e.target.value) : null
    };
}