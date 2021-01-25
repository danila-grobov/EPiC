/**
 * @author Danila Grobov
 */
import React, {useRef} from "react";
import "../../scss/textInput.scss";
import Input from "./Input";
import Helper from "./Helper";
import Label from "./Label";
import InputStateProvider from "./InputStateProvider";

/**
 * Displays an input with char counter and helper capabilities.
 */
export default props => {
    const {
        className = "", maxLength, value, errorMessage = "", disabled = false,
        inputRef = useRef(null), ...otherProps
    } = props;
    const stateProviderConfig = {maxLength, value, errorMessage, inputRef}
    const wrapperConfig = !disabled ? {
        className: "textInput__wrapper " + className,
        onClick: () => inputRef.current.focus()
    } : {
        className: "textInput__wrapper " + className + " textInput__wrapper--disabled"
    }
    return (
        <div {...wrapperConfig}>
            <div className={`textInput ${errorMessage.length === 0 ? "" : "textInput--error"}`}>
                <InputStateProvider {...stateProviderConfig} {...otherProps}>
                    <Label/>
                    <Input className={"textInput__input"}/>
                    <Helper/>
                </InputStateProvider>
            </div>
            <CharCounter maxLength={maxLength} length={value.length}/>
            <span className="textInput__error">{errorMessage.length === 0 ? "" : errorMessage}</span>
        </div>
    )
}

function CharCounter({maxLength, length}) {
    if (maxLength)
        return <span className="textInput__charCounter">{`${length}/${maxLength}`}</span>;
    return null;
}