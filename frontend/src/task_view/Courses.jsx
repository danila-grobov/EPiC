import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import data from './testCourseData';
import {ButtonGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default (props) => {

    const handleClick = (courseName) => {
        props.setCourse(courseName);
    }

    return(
        <div className="courses">
            <p>Courses: </p>
            <div className="course-select-dropdown">
                {[DropdownButton].map((DropdownType, index) => (
                    <DropdownType
                        as={ButtonGroup}
                        key={index}
                        id={'dropdown-button-drop-${idx}'}
                        size="lg"
                        title={props.course}
                    >
                        {data.map(course => (
                            <Dropdown.Item key={course.value}
                                           onClick={() => handleClick(course.value)}
                            >
                                {course.value}
                            </Dropdown.Item>
                        ))}
                    </DropdownType>
                ))}
            </div>
        </div>
    )
}