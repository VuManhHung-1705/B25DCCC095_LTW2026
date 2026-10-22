import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';
import { calcPrize, generateAudiencePoll } from '../utils';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import Lifelines from '../components/Lifelines';
import AudienceChart from '../components/AudienceChart';

const Play = ({ questions, playerName, onAddHistory }) => {
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [status, setStatus] = useState('answering');
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const [used5050, setUsed5050] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [audiencePoll, setAudiencePoll] = useState(null);

  const currentQuestion = questions[currentIdx];

  const finishGame = useCallback(
    (correctCount, reason) => {
      const prize = calcPrize(correctCount, reason);
      onAddHistory({
        id: Date.now(),
        name: playerName,
        prize,
        correctCount,
        playedAt: new Date().toLocaleString('vi-VN'),
      });
      navigate('/result', {
        replace: true,
        state: {
          name: playerName,
          prize,
          correctCount,
          reason,
        },
      });
    },
    [navigate, onAddHistory, playerName]
  );

  const handleSelectOption = useCallback(
    (index) => {
      if (status !== 'answering' || hiddenOptions.includes(index)) return;
      setSelectedOption(index);
      setStatus('locked');
    },
    [status, hiddenOptions]
  );

  // Đổi tiêu đề tab trình duyệt
  useEffect(() => {
    if (playerName && questions.length > 0) {
      document.title = `Câu ${currentIdx + 1}/${questions.length} – ${playerName}`;
    }
    return () => {
      document.title = 'Ai là triệu phú';
    };
  }, [currentIdx, playerName, questions.length]);

  // Đồng hồ đếm lùi 30 giây
  useEffect(() => {
    if (status !== 'answering') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishGame(currentIdx, 'timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, currentIdx, finishGame]);

  // Chờ 1 giây lộ đáp án, 2 giây chuyển câu hoặc kết thúc
  useEffect(() => {
    let timer;
    if (status === 'locked') {
      timer = setTimeout(() => {
        setStatus('revealed');
      }, 1000);
    } else if (status === 'revealed') {
      timer = setTimeout(() => {
        const isCorrect = selectedOption === currentQuestion.answer;
        if (isCorrect) {
          if (currentIdx + 1 === questions.length) {
            finishGame(questions.length, 'win');
          } else {
            setCurrentIdx((prev) => prev + 1);
            setStatus('answering');
            setSelectedOption(null);
            setTimeLeft(TIME_PER_QUESTION);
            setHiddenOptions([]);
            setAudiencePoll(null);
          }
        } else {
          finishGame(currentIdx, 'wrong');
        }
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [status, selectedOption, currentQuestion, currentIdx, questions.length, finishGame]);

  // Phím tắt A, B, C, D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== 'answering') return;
      const key = e.key.toUpperCase();
      const keyMap = { A: 0, B: 1, C: 2, D: 3 };
      if (keyMap[key] !== undefined) {
        const idx = keyMap[key];
        if (!hiddenOptions.includes(idx)) {
          handleSelectOption(idx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, hiddenOptions, handleSelectOption]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) return null;

  const handleUse5050 = () => {
    if (used5050 || status !== 'answering') return;
    const wrongIndices = [0, 1, 2, 3].filter((i) => i !== currentQuestion.answer);
    const shuffled = [...wrongIndices].sort(() => Math.random() - 0.5);
    setHiddenOptions(shuffled.slice(0, 2));
    setUsed5050(true);
  };

  const handleUseAudience = () => {
    if (usedAudience || status !== 'answering') return;
    const poll = generateAudiencePoll(currentQuestion.answer, hiddenOptions);
    setAudiencePoll(poll);
    setUsedAudience(true);
  };

  const handleStopGame = () => {
    if (status !== 'answering') return;
    finishGame(currentIdx, 'stop');
  };

  return (
    <div className="play-layout">
      <div className="play-main">
        <Lifelines
          used5050={used5050}
          usedAudience={usedAudience}
          onUse5050={handleUse5050}
          onUseAudience={handleUseAudience}
          onStopGame={handleStopGame}
          disabled={status !== 'answering'}
        />
        <Timer timeLeft={timeLeft} />
        <QuestionCard
          questionIndex={currentIdx}
          totalQuestions={questions.length}
          questionData={currentQuestion}
          hiddenOptions={hiddenOptions}
          status={status}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
        />
        <AudienceChart pollData={audiencePoll} />
      </div>
      <MoneyLadder currentQuestionIndex={currentIdx} />
    </div>
  );
};

export default Play;