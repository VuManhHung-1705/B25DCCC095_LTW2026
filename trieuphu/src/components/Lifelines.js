import React from 'react';

const Lifelines = ({ used5050, usedAudience, onUse5050, onUseAudience, onStopGame, disabled }) => {
  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
      <button className="btn" onClick={onUse5050} disabled={used5050 || disabled}>
        50:50
      </button>
      <button className="btn" onClick={onUseAudience} disabled={usedAudience || disabled}>
        Hỏi khán giả
      </button>
      <button className="btn btn-danger" onClick={onStopGame} disabled={disabled}>
        Dừng cuộc chơi
      </button>
    </div>
  );
};

export default Lifelines;