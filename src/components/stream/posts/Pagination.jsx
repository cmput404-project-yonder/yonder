import React from 'react';

const Pagination = ({ commentsPerPage, totalComments, paginate }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <nav className="pagination" role="navigation" aria-label="pagination" style={{ display:"flex", justifyContent:"center", marginRight:`2%` }}>
            <ul className="pagination">
                {/* <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                </li> */}
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="pagination-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;