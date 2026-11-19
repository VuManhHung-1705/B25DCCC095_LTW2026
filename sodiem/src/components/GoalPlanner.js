import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses } from '../features/coursesSlice';
import { selectGoal, setRemaining, setTarget } from '../features/goalSlice';
import { calcRequired } from '../utils';

const GoalPlanner = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const { target, remaining } = useSelector(selectGoal);

  const result = useMemo(
    () => calcRequired(courses, target, remaining),
    [courses, target, remaining]
  );

  return (
    <section>
      <h2>Mục tiêu GPA</h2>
      <div className="form-grid">
      <div className="field">
        <label htmlFor="goal-target">GPA mục tiêu</label>
        <input
          id="goal-target"
          type="number"
          step="0.01"
          value={target}
          onChange={(e) => dispatch(setTarget(e.target.value))}
        />
      </div>
      <div className="field">
        <label htmlFor="goal-remaining">Số tín chỉ còn lại</label>
        <input
          id="goal-remaining"
          type="number"
          value={remaining}
          onChange={(e) => dispatch(setRemaining(e.target.value))}
        />
      </div>
      </div>
      <p className="result">{result}</p>
    </section>
  );
};

export default GoalPlanner;
