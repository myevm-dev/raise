import React from 'react';

const AccountLevel: React.FC = () => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'];

  return (
    <div
      style={{
        backgroundColor: '#1c1f26',
        color: '#fff',
        border: '2px solid #6600CC',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      {/* Step Counter */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: '10px 15px',
              borderRadius: '4px',
              backgroundColor: index === 0 ? '#6600CC' : '#3a3d45', // Highlight Step 1
              color: '#fff',
              fontWeight: index === 0 ? 'bold' : 'normal',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Account Level Text */}
      <p
        style={{
          margin: '0 0 10px 0',
          fontSize: '1.2rem',
        }}
      >
        Account Level: Noob
      </p>

      {/* Account Level Image */}
      <img
        src="/noob.png"
        alt="Account Level"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default AccountLevel;
