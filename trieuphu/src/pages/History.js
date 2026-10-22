import React from 'react';
import { formatMoney } from '../data';

const History = ({ history, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="card">
        <h2>Lịch sử các lượt chơi</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  const sortedHistory = [...history].sort((a, b) => b.prize - a.prize);
  const highestPrize = sortedHistory[0].prize;
  const totalPrize = history.reduce((sum, item) => sum + item.prize, 0);

  return (
    <div className="card">
      <h2>Lịch sử các lượt chơi</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <p>{`Số lượt chơi: ${history.length}`}</p>
          <p>{`Tiền thưởng cao nhất: ${formatMoney(highestPrize)}`}</p>
          <p style={{ fontWeight: 'bold' }}>{`Tổng tiền thưởng: ${formatMoney(totalPrize)}`}</p>
        </div>
        <button className="btn btn-danger" onClick={onClearHistory}>
          Xóa lịch sử
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Người chơi</th>
            <th style={{ textAlign: 'center' }}>Số câu đúng</th>
            <th style={{ textAlign: 'right' }}>Tiền thưởng</th>
            <th style={{ textAlign: 'center' }}>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((item) => (
            <tr key={item.id}>
              <td style={{ fontWeight: '500' }}>{item.name}</td>
              <td style={{ textAlign: 'center' }}>{item.correctCount}</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#16a34a' }}>
                {formatMoney(item.prize)}
              </td>
              <td style={{ textAlign: 'center' }}>{item.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;