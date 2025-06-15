import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(setItem)
      .catch(() => navigate('/'));
  }, [id, navigate]);

  if (!item) {
    // Skeleton loader styling
    return (
      <div style={{ padding: '1rem' }}>
        <div style={{
          backgroundColor: '#f0f0f0',
          height: 24,
          width: '60%',
          borderRadius: 4,
          marginBottom: 12
        }} />
        <div style={{
          backgroundColor: '#f0f0f0',
          height: 16,
          width: '40%',
          borderRadius: 4,
          marginBottom: 8
        }} />
        <div style={{
          backgroundColor: '#f0f0f0',
          height: 16,
          width: '30%',
          borderRadius: 4
        }} />
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      lineHeight: '1.8'
    }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem', color: '#333' }}>{item.name}</h2>
      <dl>
        <dt style={{ fontWeight: 'bold', color: '#555' }}>Category:</dt>
        <dd style={{ marginBottom: '0.75rem', color: '#666' }}>{item.category}</dd>

        <dt style={{ fontWeight: 'bold', color: '#555' }}>Price:</dt>
        <dd style={{ color: '#28a745', fontWeight: 'bold' }}>${item.price}</dd>
      </dl>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '2rem',
          padding: '0.6rem 1.2rem',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff',
          fontWeight: 500,
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        ← Go Back
      </button>
    </div>
  );
}

export default ItemDetail;
