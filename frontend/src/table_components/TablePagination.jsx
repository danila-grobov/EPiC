import React from "react";
import arrow from "../imgs/arrow.svg";
import arrow_d from "../imgs/arrow_disabled.svg";
import doubleArrow from "../imgs/doubleArrow.svg";
import doubleArrow_d from "../imgs/doubleArrow_disabled.svg";
export default () => {
    return (
        <div className="tablePagination">
            <img src={doubleArrow_d} alt="disabled left double arrow" className="tablePagination__arrow"/>
            <img src={arrow_d} alt="disabled left arrow" className="tablePagination__arrow"/>
            <span className="tablePagination__pageNumber--current">
                1
            </span>
            <span className="tablePagination__pageNumber">
                2
            </span>
            <span className="tablePagination__pageNumber">
                3
            </span>
            <span className="tablePagination__pageNumber">
                4
            </span>
            <span className="tablePagination__pageNumber">
                5
            </span>
            <img src={arrow} alt="right arrow" className="tablePagination__arrow"/>
            <img src={doubleArrow} alt="right double arrow" className="tablePagination__arrow"/>
        </div>
    )
}