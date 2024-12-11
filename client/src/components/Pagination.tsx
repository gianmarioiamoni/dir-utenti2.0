import { FC } from 'react';

interface PaginationProps {
    currentPage: number;
    totalUsers: number;
    nUsersPerPage: number;
    nGroups: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalUsers,
    nUsersPerPage,
    nGroups,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalUsers / nUsersPerPage);
    const currentGroup = Math.ceil(currentPage / nGroups);
    const totalGroups = Math.ceil(totalPages / nGroups);

    const renderPageButtons = () => {
        const startPage = (currentGroup - 1) * nGroups + 1;
        const endPage = Math.min(startPage + (nGroups - 1), totalPages);

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
                        onClick={() => onPageChange((currentGroup - 2) * nGroups + nGroups)}
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
                        onClick={() => onPageChange(currentGroup * nGroups + 1)}
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