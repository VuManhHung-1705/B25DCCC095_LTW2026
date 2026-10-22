import React from 'react';
import { LETTERS } from '../data';

const AudienceChart = ({ pollData }) => {
  if (!pollData) return null;

  return (
    <div className="card">
      <h4 style={{ marginBottom: '12px' }}>Ý kiến khán giả trường quay:</h4>
      {pollData.map((percent, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          <div style={{ marginBottom: '4px', fontWeight: '600', fontSize: '14px' }}>
            {`${LETTERS[idx]}: ${percent}%`}
          </div>
          <div style={{ background: '#e2e8f0', width: '100%', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${percent}%`,
                backgroundColor: '#2563eb',
                height: '100%',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudienceChart;