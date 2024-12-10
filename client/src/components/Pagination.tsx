import { FC } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
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
                    ${currentPage === page
                        ? 'paging-number-btn'
                        : 'paging-number-btn-inactive'}
                `}
            >
                {page}
            </button>
        ));
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
                {/* Prima pagina */}
                {currentPage > 1 && (
                    <button
                        onClick={() => onPageChange(1)}
                        className="paging-number-btn-inactive"
                    >
                        {'<<'}
                    </button>
                )}

                {/* Gruppo precedente */}
                {currentGroup > 1 && (
                    <button
                        onClick={() => onPageChange((currentGroup - 2) * 5 + 5)}
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
                        className="paging-number-btn-inactive"
                    >
                        {'>'}
                    </button>
                )}

                {/* Ultima pagina */}
                {currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="paging-number-btn-inactive"
                    >
                        {'>>'}
                    </button>
                )}
            </div>

            {/* Numero di pagina corrente */}
            <div className="text-sm text-foreground">
                Pagina {currentPage} di {totalPages}
            </div>
        </div>
    );
};

export default Pagination;