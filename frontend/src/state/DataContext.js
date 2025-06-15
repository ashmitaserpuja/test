import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const fetchItems = useCallback(async (pageNumber = 1, search = '') => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: pageNumber.toString(),
      q: search
    });

    const res = await fetch(`http://localhost:3001/api/items?${params.toString()}`); // Intentional bug: backend ignores limit
    const json = await res.json();

    setTotalCount(json.totalCount);
    setPage(json.page);
    setLimit(json.limit);
    setItems(json.items);
  }, []);

  return (
    <DataContext.Provider value={{ items, fetchItems, totalCount, page, setPage, limit }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);