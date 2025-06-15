import { Routes, Route, Link } from 'react-router-dom';
import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../state/DataContext';

function App() {
  return (
    <DataProvider>
      <header
        style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid #ddd',
          backgroundColor: '#f8f9fa',
          marginBottom: '1rem',
        }}
      >
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#007bff',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.color = '#0056b3')}
            onMouseOut={(e) => (e.target.style.color = '#007bff')}
          >
            Items
          </Link>
        </nav>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </main>
    </DataProvider>
  );
}

export default App;
