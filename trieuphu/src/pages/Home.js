import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const bestRecord =
    history.length > 0
      ? [...history].sort((a, b) => b.prize - a.prize)[0]
      : null;

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <div className="card">
      <h1>Ai là triệu phú</h1>
      <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #2563eb', marginBottom: '20px' }}>
        <h3>Luật chơi:</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Trả lời lần lượt 15 câu hỏi trắc nghiệm (HTML, CSS, ES6, React) để chinh phục mốc 250.000.000 đ.</li>
          <li>Mỗi câu có 30 giây suy nghĩ. Hết giờ được tính như trả lời sai.</li>
          <li>Các mốc an toàn: <strong>Câu 5, Câu 10, Câu 15</strong>. Trả lời sai hoặc hết giờ sẽ nhận tiền của mốc an toàn cao nhất đã vượt qua.</li>
          <li>Có 3 quyền trợ giúp trên đường đi: <strong>50:50</strong>, <strong>Hỏi khán giả</strong>, và <strong>Dừng cuộc chơi</strong>.</li>
        </ul>
      </div>

      {bestRecord && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', backgroundColor: '#fef3c7', color: '#b45309', borderRadius: '6px', fontWeight: 'bold', fontSize: '17px' }}>
          {`Kỷ lục: ${formatMoney(bestRecord.prize)} – ${bestRecord.name}`}
        </div>
      )}

      <form onSubmit={handleStart} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Nhập tên người chơi..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ width: '280px' }}
        />
        <button type="submit" className="btn" disabled={!playerName.trim()}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;