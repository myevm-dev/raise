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
        flexDirection: 'column', // Stack text and image vertically
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'border-color 0.3s ease', // Smooth hover effect
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      <p
        style={{
          margin: '0 0 10px 0', // Adds space between text and image
          fontSize: '1.2rem',
        }}
      >
        Account Level: Noob
      </p>
      <img
        src="/noob.png"
        alt="Account Level"
        style={{
          maxWidth: '100%', // Ensures image scales to fit box width
          maxHeight: '100%', // Ensures image scales to fit box height
          objectFit: 'contain', // Ensures the image maintains aspect ratio
          borderRadius: '4px', // Optional for rounded corners
        }}
      />
    </div>
  );
};

export default AccountLevel;
