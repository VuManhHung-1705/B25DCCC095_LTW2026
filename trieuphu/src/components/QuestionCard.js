import React from 'react';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  questionIndex,
  totalQuestions,
  questionData,
  hiddenOptions,
  status,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="card">
      <h3>{`Câu ${questionIndex + 1}/${totalQuestions}`}</h3>
      <p style={{ fontSize: '20px', fontWeight: '600' }}>
        {questionData.question}
      </p>
      <div className="answer-grid">
        {questionData.options.map((opt, idx) => (
          <AnswerButton
            key={idx}
            index={idx}
            text={opt}
            isHidden={hiddenOptions.includes(idx)}
            status={status}
            isSelected={selectedOption === idx}
            isCorrect={questionData.answer === idx}
            onSelect={onSelectOption}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;