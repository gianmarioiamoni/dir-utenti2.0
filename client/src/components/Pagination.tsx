import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    const currentGroup = Math.ceil(currentPage / 5);
    const totalGroups = Math.ceil(totalPages / 5);

    const renderPageButtons = () => {
        const startPage = (currentGroup - 1) * 5 + 1;
        const endPage = Math.min(startPage + 4, totalPages);

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        ).map(page => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
          px-4 py-2 mx-1 rounded 
          ${currentPage === page
                        // ? 'bg-primary text-white rounded-full'
                        // : 'bg-secondary text-gray-700 hover:bg-gray-300 rounded-full'}
                        ? 'paging-number-btn'
                        : 'paging-number-btn-inactive'}
        `}
            >
                {page}
            </button>
        ));
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* Prima pagina */}
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(1)}
                    // className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                    className="paging-number-btn-inactive"
                >
                    {'<<'}
                </button>
            )}

            {/* Gruppo precedente */}
            {currentGroup > 1 && (
                <button
                    onClick={() => onPageChange((currentGroup - 2) * 5 + 5)}
                    // className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                    className="paging-number-btn-inactive"
                >
                    {'<'}
                </button>
            )}

            {/* Bottoni pagine */}
            {renderPageButtons()}

            {/* Gruppo successivo */}
            {currentGroup < totalGroups && (
                <button
                    onClick={() => onPageChange(currentGroup * 5 + 1)}
                    // className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                    className="paging-number-btn-inactive"
                >
                    {'>'}
                </button>
            )}

            {/* Ultima pagina */}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    // className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                    className="paging-number-btn-inactive"
                >
                    {'>>'}
                </button>
            )}
        </div>
    );
};

export default Pagination;