const COURSES_KEY = 'ltw_sodiem_courses';

export const loadSaved = () => {
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    if (raw === null) return null;
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : null;
  } catch (err) {
    return null;
  }
};

export const saveCourses = (courses) => {
  try {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  } catch (err) {
    // bỏ qua lỗi ghi (đầy bộ nhớ, chế độ riêng tư...)
  }
};
