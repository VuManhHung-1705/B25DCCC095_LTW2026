import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div
      style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: timeLeft <= 10 ? 'red' : '#1e293b',
        marginBottom: '12px',
      }}
    >
      {`Còn ${timeLeft} giây`}
    </div>
  );
};

export default Timer;