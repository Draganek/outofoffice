import React from 'react';

// Komponent GlobalFilter do wyszukiwania globalnego
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className="mb-3">
            <label htmlFor="globalSearch" className="form-label">Search by Full Name:</label>
            <input
                id="globalSearch"
                type="text"
                className="form-control"
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Enter full name..."
            />
        </div>
    );
};

// Komponent ColumnFilter do filtrowania kolumn za pomocą select
export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter, preFilteredRows, id } = column;
    const options = React.useMemo(() => {
        const optionsSet = new Set();
        preFilteredRows.forEach(row => {
            optionsSet.add(row.values[id]);
        });
        return [...optionsSet.values()];
    }, [id, preFilteredRows]);

    return (
        <select
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
            style={{ marginRight: '5px' }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
