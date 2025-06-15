import React, { useEffect, useState } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';
import { FixedSizeList as VirtualList } from 'react-window';

function Items() {
  const { items, fetchItems, totalCount, page, setPage, limit } = useData();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        await fetchItems(page, search);
      } catch (err) {
        if (active) console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [fetchItems, page, search]);

  const totalPages = Math.ceil(totalCount / limit);

  const renderRow = ({ index, style }) => {
    const item = items[index];
    return (
      <div
        key={item.id}
        style={{
          ...style,
          padding: '12px 16px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff'
        }}
      >
        <Link
          to={`/items/${item.id}`}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.color = '#007bff')}
          onMouseOut={(e) => (e.target.style.color = '#333')}
        >
          {item.name}
        </Link>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <input
        type="search"
        placeholder="Search item \^O^/"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          marginBottom: '1rem',
          padding: '0.75rem 1rem',
          width: '100%',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : !items.length ? (
        <p>No items found.</p>
      ) : (
        <VirtualList
          height={300}
          itemCount={items.length}
          itemSize={52}
          width="100%"
        >
          {renderRow}
        </VirtualList>
      )}

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          style={{
            padding: '0.5rem 1.25rem',
            border: 'none',
            backgroundColor: page <= 1 ? '#ccc' : '#007bff',
            color: '#fff',
            borderRadius: '6px',
            cursor: page <= 1 ? 'not-allowed' : 'pointer',
            fontWeight: '500',
          }}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span style={{ fontWeight: '500' }}>
          Page {page} of {totalPages}
        </span>
        <button
          style={{
            padding: '0.5rem 1.25rem',
            border: 'none',
            backgroundColor: page >= totalPages ? '#ccc' : '#007bff',
            color: '#fff',
            borderRadius: '6px',
            cursor: page >= totalPages ? 'not-allowed' : 'pointer',
            fontWeight: '500',
          }}
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Items;
