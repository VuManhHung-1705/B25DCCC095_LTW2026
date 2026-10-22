import React from 'react';
import { PRIZES, MILESTONES, formatMoney } from '../data';

const MoneyLadder = ({ currentQuestionIndex }) => {
  const ladder = PRIZES.map((prize, index) => ({
    step: index + 1,
    prize,
  })).reverse();

  return (
    <div className="money-ladder">
      <h4>Thang tiền thưởng</h4>
      <ul style={{ listStyle: 'none' }}>
        {ladder.map(({ step, prize }) => {
          const isCurrent = step === currentQuestionIndex + 1;
          const isMilestone = MILESTONES.includes(step);
          return (
            <li
              key={step}
              className="ladder-item"
              style={{
                backgroundColor: isCurrent ? '#f59e0b' : 'transparent',
                color: isCurrent ? '#ffffff' : isMilestone ? '#fbbf24' : '#e2e8f0',
                fontWeight: isMilestone || isCurrent ? 'bold' : 'normal',
              }}
            >
              <span>{`Câu ${step}`}</span>
              <span>{formatMoney(prize)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoneyLadder;