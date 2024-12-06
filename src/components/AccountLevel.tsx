import React from 'react';

const AccountLevel: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#1c1f26',
        color: '#fff',
        border: '2px solid #6600CC', // Purple border
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Consistent shadow
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'border-color 0.3s ease', // Smooth hover effect
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      <p style={{ margin: 0, fontSize: '1.2rem' }}>Account Level Placeholder</p>
    </div>
  );
};

export default AccountLevel;
