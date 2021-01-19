import React, {useState} from "react";
import arrow from "../imgs/arrow.svg";
import arrow_d from "../imgs/arrow_disabled.svg";
import doubleArrow from "../imgs/doubleArrow.svg";
import doubleArrow_d from "../imgs/doubleArrow_disabled.svg";
import {useLayoutEffect} from "react";

const getNumberRange = (from, to) => {
    if (from <= to) {
        const numbers = Array(to - from + 1).keys();
        return [...numbers].map(number => number + from);
    }
    return []
}
const getOrderedPages = (currentPage, pageCount) => {
    let nOfPagesAfter = pageCount - currentPage;
    let nOfPagesBefore = Math.max(0, currentPage - 1);
    nOfPagesBefore = Math.min(nOfPagesBefore, 2);
    nOfPagesAfter = Math.min(nOfPagesAfter, 2);// Limit the number of pages to two
    if (nOfPagesBefore < 2) {
        nOfPagesAfter += 2 - nOfPagesBefore;
    }
    if (nOfPagesAfter < 2) {
        nOfPagesBefore += 2 - nOfPagesAfter;
    } // Add some additional pages if there is not enough on the other side.
    const numbersBeforeCurr = getNumberRange(
        Math.max(1, currentPage - nOfPagesBefore),
        currentPage - 1);
    const numbersAfterCurr = getNumberRange(
        currentPage + 1,
        Math.min(pageCount, currentPage + nOfPagesAfter));
    return [...numbersBeforeCurr, currentPage, ...numbersAfterCurr].slice(0,5);
}
export default props => {
    const {rowCount, total, setCurrentPage, currentPage} = props;
    const pageCount = Math.ceil(total / rowCount);
    const moveCurrPage = dir => {
        let newPage = currentPage + dir;
        if (newPage > pageCount) newPage = pageCount;
        if (newPage < 1) newPage = 1;
        setCurrentPage(newPage);
    }
    useLayoutEffect( () => {
        if(currentPage > pageCount && pageCount !== 0) {
            setCurrentPage(pageCount)
        }
    },[rowCount])
    return (
        <div className="tablePagination">
            <img src={currentPage === 1 ? doubleArrow_d : doubleArrow}
                 alt="left double arrow" className="tablePagination__arrow--left"
                 onClick={() => setCurrentPage(1)}/>
            <img src={currentPage === 1 ? arrow_d : arrow}
                 alt="left arrow" className="tablePagination__arrow--left"
                 onClick={() => moveCurrPage(-1)}/>
            {
                total > 0 ?
                getOrderedPages(currentPage, pageCount).map((pageN, index) =>
                    <span key={index}
                          className={`tablePagination__pageNumber${pageN === currentPage ? "--current" : ""}`}
                          onClick={() => setCurrentPage(pageN)}>
                        {pageN}
                    </span>
                ) : ""
            }
            <img src={currentPage === pageCount ? arrow_d : arrow}
                 alt="right arrow" className="tablePagination__arrow"
                 onClick={() => moveCurrPage(1)}/>
            <img src={currentPage === pageCount ? doubleArrow_d : doubleArrow}
                 alt="right double arrow" className="tablePagination__arrow"
                 onClick={() => setCurrentPage(pageCount)}/>
        </div>
    )
}