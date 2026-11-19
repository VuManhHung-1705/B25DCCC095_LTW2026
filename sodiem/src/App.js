import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCourseForm from './components/AddCourseForm';
import CourseRow from './components/CourseRow';
import GoalPlanner from './components/GoalPlanner';
import { useNotice } from './context/NoticeContext';
import { useTheme } from './context/ThemeContext';
import { GRADES, SEMESTERS } from './data';
import { removeCourse, selectCourses, setCourses, setScore } from './features/coursesSlice';
import useDebounce from './hooks/useDebounce';
import useFetch from './hooks/useFetch';
import useLocalStorage from './hooks/useLocalStorage';
import { hasSaved } from './store';
import { calcStats, getGrade, normalizeText } from './utils';

const BUILD_TAG = "gp-4073";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const showNotice = useNotice();
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const { data, loading, error } = useFetch('/data/courses.json');
  const [semester, setSemester] = useLocalStorage('ltw_sodiem_semester', 'all');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const searchRef = useRef(null);

  // Chỉ nạp dữ liệu mẫu khi chưa có dữ liệu đã lưu
  useEffect(() => {
    if (data && !hasSaved) dispatch(setCourses(data));
  }, [data, dispatch]);

  const bySemester = useMemo(
    () => courses.filter((c) => semester === 'all' || c.semester === semester),
    [courses, semester]
  );

  const visible = useMemo(() => {
    const q = normalizeText(debouncedSearch);
    if (!q) return bySemester;
    return bySemester.filter(
      (c) => normalizeText(c.name).includes(q) || normalizeText(c.code).includes(q)
    );
  }, [bySemester, debouncedSearch]);

  const stats = useMemo(() => calcStats(bySemester), [bySemester]);
  const cumulative = useMemo(() => calcStats(courses), [courses]);

  const distribution = useMemo(
    () =>
      GRADES.map((g) => ({
        letter: g.letter,
        count: bySemester.filter((c) => getGrade(c.score).letter === g.letter).length,
      })),
    [bySemester]
  );

  useEffect(() => {
    document.title =
      cumulative.count > 0 ? `GPA ${cumulative.gpa.toFixed(2)} – Sổ điểm` : 'Sổ điểm';
  }, [cumulative.count, cumulative.gpa]);

  useEffect(() => {
    const handleKey = (e) => {
      const el = document.activeElement;
      if (e.key === 'Escape' && el === searchRef.current) {
        setSearch('');
        return;
      }
      if (e.key === '/') {
        const tag = el ? el.tagName : '';
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tag) || (el && el.isContentEditable)) return;
        e.preventDefault();
        if (searchRef.current) searchRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleScore = useCallback(
    (id, score) => dispatch(setScore({ id, score })),
    [dispatch]
  );

  const handleRemove = useCallback(
    (id, name) => {
      dispatch(removeCourse(id));
      showNotice(`Đã xóa môn ${name}`);
    },
    [dispatch, showNotice]
  );

  const handleReset = useCallback(() => {
    if (!data) return;
    dispatch(setCourses(data));
    showNotice('Đã đặt lại dữ liệu mẫu');
  }, [data, dispatch, showNotice]);

  const handleCourseShift = (e) => setSearch(e.target.value);

  let tableArea;
  if (!hasSaved && loading) {
    tableArea = <p>Đang tải bảng điểm...</p>;
  } else if (!hasSaved && error) {
    tableArea = <p>Không tải được bảng điểm</p>;
  } else if (visible.length === 0) {
    tableArea = <p>Chưa có môn học nào</p>;
  } else {
    tableArea = (
      <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Mã môn</th>
            <th>Tên môn</th>
            <th>Tín chỉ</th>
            <th>Học kỳ</th>
            <th>Điểm (hệ 10)</th>
            <th>Điểm chữ</th>
            <th>Điểm (hệ 4)</th>
            <th>Số lần render</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
              onScore={handleScore}
              onRemove={handleRemove}
            />
          ))}
        </tbody>
      </table>
      </div>
    );
  }

  return (
    <div className={`app ${theme}`} data-build={BUILD_TAG}>
      <div className="container">
      <h1>Sổ điểm sinh viên</h1>
      <button type="button" className="secondary" onClick={toggleTheme}>
        {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
      </button>

      <section>
        <h2>Thống kê</h2>
        <div className="stats">
        <p>{`Số môn: ${stats.count}`}</p>
        <p>{`Tổng tín chỉ: ${stats.credits}`}</p>
        <p>{`GPA (hệ 4): ${stats.gpa.toFixed(2)}`}</p>
        <p>{`Xếp loại: ${stats.rank}`}</p>
        <p>{`GPA tích lũy: ${cumulative.gpa.toFixed(2)}`}</p>
        </div>
        <h3>Phân bố điểm chữ</h3>
        <ul className="dist">
          {distribution.map((d) => (
            <li key={d.letter}>
              {`${d.letter}: ${d.count}`}
              <span className="bar" style={{ width: 24 * d.count }} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Bảng điểm</h2>
        <div className="toolbar">
        <div className="field">
          <label htmlFor="semester">Xem học kỳ</label>
          <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="all">Tất cả</option>
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="search">Tìm môn học</label>
          <input
            id="search"
            type="text"
            ref={searchRef}
            value={search}
            onChange={handleCourseShift}
          />
        </div>
        <p className="found">{`Tìm thấy ${visible.length} môn`}</p>
        </div>
        {tableArea}
        <button type="button" className="secondary" onClick={handleReset} disabled={!data}>
          Đặt lại dữ liệu mẫu
        </button>
      </section>

      <AddCourseForm />
      <GoalPlanner />
      </div>
    </div>
  );
};

export default App;
