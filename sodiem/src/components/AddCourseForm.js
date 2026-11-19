import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CREDIT_OPTIONS, SEMESTERS } from '../data';
import { addCourse, selectCourses } from '../features/coursesSlice';
import { useNotice } from '../context/NoticeContext';

const EMPTY = { code: '', name: '', credits: 3, semester: SEMESTERS[0], score: '' };

const AddCourseForm = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const showNotice = useNotice();
  const codeRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = form.code.trim();
    const name = form.name.trim();
    const score = form.score === '' ? NaN : Number(form.score);
    const next = {};

    if (!code) next.code = 'Hãy nhập mã môn';
    else if (courses.some((c) => c.code.toLowerCase() === code.toLowerCase())) {
      next.code = 'Mã môn đã tồn tại';
    }
    if (!name) next.name = 'Hãy nhập tên môn';
    if (!(score >= 0 && score <= 10)) next.score = 'Điểm phải từ 0 đến 10';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    dispatch(
      addCourse({
        code: code.toUpperCase(),
        name,
        credits: Number(form.credits),
        semester: form.semester,
        score,
      })
    );
    showNotice(`Đã thêm môn ${name}`);
    setForm(EMPTY);
    codeRef.current.focus();
  };

  return (
    <section>
      <h2>Thêm môn học</h2>
      <form className="form-grid" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="add-code">Mã môn</label>
          <input id="add-code" type="text" ref={codeRef} value={form.code} onChange={setField('code')} />
          {errors.code && <div role="alert" className="error">{errors.code}</div>}
        </div>
        <div className="field">
          <label htmlFor="add-name">Tên môn</label>
          <input id="add-name" type="text" value={form.name} onChange={setField('name')} />
          {errors.name && <div role="alert" className="error">{errors.name}</div>}
        </div>
        <div className="field">
          <label htmlFor="add-credits">Số tín chỉ</label>
          <select id="add-credits" value={form.credits} onChange={setField('credits')}>
            {CREDIT_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="add-semester">Học kỳ</label>
          <select id="add-semester" value={form.semester} onChange={setField('semester')}>
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="add-score">Điểm hệ 10</label>
          <input id="add-score" type="number" value={form.score} onChange={setField('score')} />
          {errors.score && <div role="alert" className="error">{errors.score}</div>}
        </div>
        <button type="submit" className="primary">Thêm môn</button>
      </form>
    </section>
  );
};

export default AddCourseForm;
