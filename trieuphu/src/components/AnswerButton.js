import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({ index, text, isHidden, status, isSelected, isCorrect, onSelect }) => {
  if (isHidden) {
    return (
      <button
        disabled
        className="answer-btn"
        style={{ visibility: 'hidden' }}
      />
    );
  }

  let bgColor = '#ffffff';
  let textColor = '#1e293b';
  let borderColor = '#cbd5e1';
  let extraClass = '';

  if (status === 'locked' && isSelected) {
    bgColor = 'orange';
    textColor = '#ffffff';
    borderColor = '#d97706';
    extraClass = 'answer-locked';
  } else if (status === 'revealed') {
    if (isCorrect) {
      bgColor = '#22c55e'; // Xanh lá
      textColor = '#ffffff';
      borderColor = '#16a34a';
    } else if (isSelected && !isCorrect) {
      bgColor = '#ef4444'; // Đỏ
      textColor = '#ffffff';
      borderColor = '#dc2626';
    }
  }

  return (
    <button
      onClick={() => onSelect(index)}
      disabled={status !== 'answering'}
      className={`answer-btn ${extraClass}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
    >
      {`${LETTERS[index]}. ${text}`}
    </button>
  );
};

export default AnswerButton;