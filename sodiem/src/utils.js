import { GRADES, RANKS } from './data';

export const getGrade = (score) => GRADES.find((g) => score >= g.min);

// Chuẩn hóa để so sánh chuỗi tiếng Việt: cùng dạng Unicode, gộp khoảng trắng, không phân biệt hoa thường
export const normalizeText = (s) => String(s).normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase();

export const getRank = (gpa) => RANKS.find((r) => gpa >= r.min).title;

export const calcStats = (courses) => {
  const credits = courses.reduce((sum, c) => sum + c.credits, 0);
  const points = courses.reduce((sum, c) => sum + c.credits * getGrade(c.score).point, 0);
  if (credits === 0) {
    return { count: courses.length, credits, points, gpa: 0, rank: 'Chưa xếp loại' };
  }
  const gpa = Math.round((points / credits) * 100) / 100;
  return { count: courses.length, credits, points, gpa, rank: getRank(gpa) };
};

const INVALID = 'Hãy nhập GPA mục tiêu (0–4) và số tín chỉ còn lại (từ 1)';

export const calcRequired = (courses, target, remaining) => {
  const t = Number(target);
  const r = Number(remaining);
  if (
    String(target).trim() === '' ||
    String(remaining).trim() === '' ||
    !(t >= 0 && t <= 4) ||
    !Number.isInteger(r) ||
    r < 1
  ) {
    return INVALID;
  }
  const { credits, points } = calcStats(courses);
  const need = (t * (credits + r) - points) / r;
  if (need > 4 + 1e-9) return 'Không thể đạt mục tiêu này';
  if (need <= 1e-9) return 'Bạn đã đạt mục tiêu';
  return `Cần đạt trung bình ${need.toFixed(2)} điểm (hệ 4) ở ${r} tín chỉ còn lại`;
};
