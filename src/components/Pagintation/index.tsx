import React, { useState } from 'react';

import './pagination.css';

type OwnProps = {
    data: [],
    RC: any,
    title: string,
    dataLimit: number,
    pageLimit: number,
}

type Props = OwnProps;

export function Pagination ({
    data,
    RC,
    title,
    dataLimit,
    pageLimit
}: Props) {
    const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    };

    const changePage = (event: any) => {
        const pageNumber = Number(event?.target.value);
        setCurrentPage(pageNumber);
    };

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill('.').map((_, idx) => start + idx + 1);
    };

    return (
        <>
            <ul>
                {getPaginatedData().map((user, idx) => (
                    <li className="user-container">
                        <RC key={idx} user={user} />
                    </li>
                ))}
            </ul>

            {/* show the pagination
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time
            */}
            <div className="pagination">
            {/* previous button */}
            <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
                prev
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
                <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
                >
                <span>{item}</span>
                </button>
            ))}

            {/* next button */}
            <button
                onClick={goToNextPage}
                className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
                next
            </button>
            </div>
        </>
    );
}