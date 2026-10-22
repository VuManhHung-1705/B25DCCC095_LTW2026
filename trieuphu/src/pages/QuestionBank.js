import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions }) => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchLevel = selectedLevel === 'all' || q.level === Number(selectedLevel);
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div className="card">
      <h2>Ngân hàng câu hỏi</h2>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontWeight: '500' }}>
          Mức độ:{' '}
          <select
            className="select-field"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="1">Dễ</option>
            <option value="2">Trung bình</option>
            <option value="3">Khó</option>
          </select>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Tìm kiếm theo nội dung câu hỏi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>

      <p style={{ fontWeight: '600', marginBottom: '8px' }}>
        {`Có ${filteredQuestions.length} câu hỏi`}
      </p>

      <table className="custom-table">
        <thead>
          <tr>
            <th style={{ width: '70px', textAlign: 'center' }}>STT</th>
            <th style={{ width: '140px', textAlign: 'center' }}>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;