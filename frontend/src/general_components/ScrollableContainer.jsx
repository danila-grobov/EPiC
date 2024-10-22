/**
 * @author Danila Grobov
 */
import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

/**
 * Wraps elements in it's container and enables the use of custom scrollbar.
 */
export default props => {
    const {className, children} = props;
    return (
        <div className={className}>
            <PerfectScrollbar
                component={"div"}
                className={className}
                options={{wheelSpeed: 0.5, wheelPropagation: false, minScrollbarLength: 20}}>
                <div className={"scrollable__container"}>
                    {children}
                </div>
            </PerfectScrollbar>
        </div>
    );
};