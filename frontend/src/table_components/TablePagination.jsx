import React, {useState} from "react";
import arrow from "../imgs/arrow.svg";
import arrow_d from "../imgs/arrow_disabled.svg";
import doubleArrow from "../imgs/doubleArrow.svg";
import doubleArrow_d from "../imgs/doubleArrow_disabled.svg";

const getNumberRange = (from, to) => {
    if (from <= to) {
        const numbers = Array(to - from + 1).keys();
        return [...numbers].map(number => number + from);
    }
    return []
}
const getOrderedPages = (currentPage, pageCount) => {
    let nOfPagesAfter = pageCount - currentPage;
    let nOfPagesBefore = currentPage - 1;
    let pagesMissingAfter = Math.max(0, 2 - nOfPagesBefore);
    let pagesMissingBefore = Math.max(0, 2 - nOfPagesAfter);

    const addAfter = Math.min(2,nOfPagesAfter) + pagesMissingAfter;
    const addBefore = Math.min(2,nOfPagesBefore) + pagesMissingBefore;
    const numbersBeforeCurr = getNumberRange(currentPage - addBefore, currentPage - 1);
    const numbersAfterCurr = getNumberRange(currentPage+1, currentPage+addAfter);
    return [...numbersBeforeCurr,currentPage,...numbersAfterCurr];
}
export default props => {
    const {rowCount, total, currentPage, setCurrentPage} = props;
    const pageCount = Math.ceil(total / rowCount);
    const moveCurrPage = dir => {
        let newPage = currentPage + dir;
        if (newPage > pageCount) newPage = pageCount;
        if (newPage < 1) newPage = 1;
        setCurrentPage(newPage);
    }
    return (
        <div className="tablePagination">
            <img src={currentPage === 1 ? doubleArrow_d : doubleArrow}
                 alt="left double arrow" className="tablePagination__arrow--left"
                 onClick={() => setCurrentPage(1)}/>
            <img src={currentPage === 1 ? arrow_d : arrow}
                 alt="left arrow" className="tablePagination__arrow--left"
                 onClick={() => moveCurrPage(-1)}/>
            {
                getOrderedPages(currentPage, pageCount).map((pageN, index) =>
                    <span key={index}
                          className={`tablePagination__pageNumber${pageN === currentPage ? "--current" : ""}`}
                          onClick={() => setCurrentPage(pageN)}>
                        {pageN}
                    </span>
                )
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