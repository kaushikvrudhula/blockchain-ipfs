import { useState ,useEffect} from 'react';
import { resolvePath } from 'react-router';
import { useAuth } from '../../Context/AuthContext';
const Dropdown= (props) =>{
  let [courses,setCourses]=useState([]);
  const { getCourse} = useAuth();
   useEffect( async () => {
     setCourses(await getCourse("2022"));
   },[courses]);
   console.log(courses);

    
// Using this function to update the state of fruit
// whenever a new option is selected from the dropdown
let handleCourseChange = (e) => {
  props.setCourse(e.target.value)
}

  return (
    <div className="Dropdown text-primary">
    {/* Displaying the value of fruit */}
    <br />
    { <select onChange={handleCourseChange}> 
      <option value="#"> -- Select a Course -- </option>
        
      {courses.map((course,index) => <option key={index} value={course}>{course}</option>)}
    </select> }
  
    </div>
  );

}
export default Dropdown;