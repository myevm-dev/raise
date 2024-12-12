import React, { useState } from 'react';

const AccountLevel: React.FC = () => {
  const levels = ['Noob', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7'];
  const [activeLevel, setActiveLevel] = useState<number>(0); // Default to Level 1

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
        alignItems: 'flex-start', // Aligns content to the left
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      {/* Level Counter */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {levels.map((level, index) => (
          <div
            key={index}
            onClick={() => setActiveLevel(index)}
            style={{
              padding: '10px 15px',
              borderRadius: '4px',
              backgroundColor: index === 0 ? '#6600CC' : activeLevel === index ? '#5200A3' : '#3a3d45',
              color: '#fff',
              fontWeight: index === 0 || activeLevel === index ? 'bold' : 'normal',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {level}
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        {/* Current Level Image */}
        <img
          src={`/${activeLevel + 1}.png`} // Dynamically load image based on the active level
          alt={`Level ${activeLevel + 1}`}
          style={{
            maxWidth: '75%', // Adjust to fit desired size
            maxHeight: '75%', // Adjust height constraints
            objectFit: 'contain',
            borderRadius: '4px',
          }}
        />

        {/* Current Level and Progress */}
        <div
          style={{
            marginLeft: '20px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: '2.2rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>Current Level:</p>
          <p style={{ fontSize: '3rem', margin: '0 0 10px 0', fontWeight: 'bold', color: '#6600CC' }}>
            NOOB
          </p>
          <p style={{ fontSize: '1.2rem', margin: '0 0 10px 0' }}>0/100 APE value in swaps</p>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#6600CC',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5200A3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6600CC')}
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountLevel;
