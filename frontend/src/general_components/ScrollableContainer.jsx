import React from "react"
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

export default props => {
    const {className, children} = props;

    return (
        <PerfectScrollbar options={{wheelSpeed: 0.5, wheelPropagation: false}} className={className}>
            {children}
        </PerfectScrollbar>
    )
}