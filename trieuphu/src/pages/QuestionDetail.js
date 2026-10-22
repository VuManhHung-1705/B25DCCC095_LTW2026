import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div className="card">
        <h2>Không tìm thấy câu hỏi</h2>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{`Câu hỏi số ${question.id} (${LEVELS[question.level]})`}</h2>
      <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        {question.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '550px', marginBottom: '20px' }}>
        {question.options.map((opt, idx) => {
          const isCorrect = idx === question.answer;
          return (
            <div
              key={idx}
              style={{
                padding: '12px 16px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                backgroundColor: isCorrect ? '#86efac' : '#f8fafc',
                fontWeight: isCorrect ? 'bold' : 'normal',
              }}
            >
              {`${LETTERS[idx]}. ${opt} ${isCorrect ? '(Đáp án đúng)' : ''}`}
            </div>
          );
        })}
      </div>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default QuestionDetail;