/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import './pagination.css';

type OwnProps = {
    totalRecords: number;
    pageLimit: number;
    pageNeighbours: number;
    onPageChanged: Function
};

type Props = OwnProps;

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

export function Pagination ({
    totalRecords,
    pageLimit = 30,
    pageNeighbours = 0,
    onPageChanged
}: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    pageNeighbours = typeof pageNeighbours === "number" ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;
    let totalPages = Math.ceil(totalRecords/pageLimit);

    useEffect(() => {
        gotoPage(1);
    }, []);

    const gotoPage = (page: number) => {
        const currentPage = Math.max(0, Math.min(page, totalPages));
        setCurrentPage(currentPage);
        onPageChanged(currentPage, totalPages, pageLimit);
    };

    const handleClick = (page: number | string, event: { preventDefault: () => void; }) => {
        event.preventDefault();
        gotoPage(Number(page));
    }

    const handleMoveLeft = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (currentPage === 1) {
            gotoPage(1)
        }
        gotoPage(currentPage - 1);
    }

    const handleMoveRight = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        gotoPage(currentPage + 1);
    }

    const fetchPageNumbers = () => {

        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPage - pageNeighbours;
            const rightBound = currentPage + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

            pages = range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - singleSpillOffset, startPage - 1);
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = range(endPage + 1, endPage + singleSpillOffset);
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);   
    }

    // if (totalRecords) return null;
    // if (totalPages === 1) return null;
    const pages = fetchPageNumbers();

    return (
        <>
            <nav aria-label="Page pagination">
                <ul className="pagination">
                    {pages.map((page, index) => {
                        if (page === LEFT_PAGE) {
                            return (
                                <li key={index} className="page-item">
                                    <a
                                        className="page-link"
                                        aria-label="Previous"
                                        onClick={handleMoveLeft}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                            )
                        }

                        if (page === RIGHT_PAGE) {
                            return (
                                <li key={index} className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Next"
                                    onClick={handleMoveRight}
                                  >
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                  </a>
                                </li>
                            );
                        }

                        return (
                            <li key={index} className={`page-item${currentPage === page ? " active" : ""}`}>
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={e => handleClick(page, e)}>
                                    {page}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav> 
        </>
    )
};

const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
};
