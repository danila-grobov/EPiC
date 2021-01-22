import React, {useEffect, useRef, useState} from "react";
import "../../scss/textInput.scss";
import useValue from "../../hooks/useValue";

export default props => {
    const {
        onSubmit,
        inputRef,
        width = null,
        type,
        className,
        maxLength
    } = props;
    let onChange, value, setValue;
    if(props.onChange) {
        onChange = props.onChange;
        value = props.value;
        setValue = props.setValue;
    } else {
        const valueState = useValue("");
        value = valueState.value;
        setValue = valueState.setValue;
        onChange = e => e.target.value.length <= maxLength ? setValue(e.target.value) : null
    }
    const inputListeners = {
        onKeyDown: props.onKeyDown,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onChange: onChange
    }
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
    const inputConfig = {type: inputType, ref: inputRef, value, className}
    return (
        <form onSubmit={handleSubmit}>
            <input style={{width: width ? width : donorWidth}} {...inputListeners} {...inputConfig}/>
            <span className="textInput__widthDonor" ref={widthDonor}>{value}</span>
        </form>
    );
}