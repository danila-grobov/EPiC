import React from "react"
import "../scss/button.scss"
export default props => {
    const {height, label, onClick, type,className} = props;
    switch (type) {
        case "secondary":
            return (
                <div className={["button--secondary",className].join(' ')} style={{height:height-6}} onClick={onClick}>
                    <span className="button__label">
                        {label}
                    </span>
                </div>
            )
    }

}