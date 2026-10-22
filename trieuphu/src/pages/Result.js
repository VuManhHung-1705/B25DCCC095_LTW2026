import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { formatMoney } from '../data';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { name, prize, correctCount, reason } = location.state;

  const getMessage = () => {
    if (reason === 'win') return 'Chúc mừng! Bạn đã trở thành triệu phú!';
    if (reason === 'wrong') return 'Rất tiếc, bạn đã trả lời sai';
    if (reason === 'timeout') return 'Hết giờ!';
    if (reason === 'stop') return 'Bạn đã dừng cuộc chơi';
    return '';
  };

  return (
    <div className="card" style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
      <h2>{getMessage()}</h2>
      <p style={{ fontSize: '17px', marginBottom: '8px' }}>{`Người chơi: ${name}`}</p>
      <p style={{ fontSize: '17px', marginBottom: '12px' }}>{`Số câu trả lời đúng: ${correctCount}`}</p>
      <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#16a34a', marginBottom: '24px' }}>
        {`Tiền thưởng: ${formatMoney(prize)}`}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button className="btn" onClick={() => navigate('/play')}>
          Chơi lại
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;