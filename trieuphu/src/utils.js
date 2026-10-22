import { PRIZES, MILESTONES } from './data';

export const calcPrize = (correctCount, reason) => {
  if (correctCount === 0) return 0;

  if (reason === 'win' || reason === 'stop') {
    return PRIZES[correctCount - 1];
  }

  const passedMilestones = MILESTONES.filter((m) => m <= correctCount);
  if (passedMilestones.length === 0) return 0;

  const highestMilestone = passedMilestones[passedMilestones.length - 1];
  return PRIZES[highestMilestone - 1];
};

export const generateAudiencePoll = (correctIndex, hiddenIndices) => {
  const result = [0, 0, 0, 0];
  const correctPercent = Math.floor(Math.random() * 31) + 40; // 40-70%
  result[correctIndex] = correctPercent;

  let remaining = 100 - correctPercent;
  const wrongAvailable = [0, 1, 2, 3].filter(
    (i) => i !== correctIndex && !hiddenIndices.includes(i)
  );

  wrongAvailable.forEach((idx, pos) => {
    if (pos === wrongAvailable.length - 1) {
      result[idx] = remaining;
    } else {
      const val = Math.floor(Math.random() * (remaining + 1));
      result[idx] = val;
      remaining -= val;
    }
  });

  return result;
};