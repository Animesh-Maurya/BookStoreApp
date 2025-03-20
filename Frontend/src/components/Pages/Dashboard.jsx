import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setRole(data.role);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '20px', fontSize: '20px' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f4f9',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>{role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h1>

      {role === 'admin' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}>
            <h2>Total Created Books</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data?.createdBooks.length}</p>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}>
            <h2>Total Paid Books</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data?.paidBooks.length}</p>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}>
            <h2>Total Customers</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data?.customers.length}</p>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}>
            <h2>Books in Cart</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data?.cart.length}</p>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}>
            <h2>Bought Books</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data?.bought_books.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
