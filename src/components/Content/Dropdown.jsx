import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
const Dropdown = (props) => {
  let [courses, setCourses] = useState([]);
  const { getCourse } = useAuth();
  useEffect(() => {
    async function getCourseAsync() {
      setCourses(await getCourse('2022'));
    }
    getCourseAsync();
  });
  // Using this function to update the state of fruit
  // whenever a new option is selected from the dropdown
  let handleCourseChange = (e) => {
    props.setCourse(e.target.value);
  };

  return (
    <div className="Dropdown  text-primary">
      {/* Displaying the value of fruit */}
      <br />
      {
        <select className="form1" onChange={handleCourseChange}>
          <option value="#"> -- Select a Course -- </option>

          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      }
    </div>
  );
};
export default Dropdown;
