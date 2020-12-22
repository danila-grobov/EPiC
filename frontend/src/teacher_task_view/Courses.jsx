import React, { useState } from "react";
//import LoadCourses from './LoadCourses';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import data from './testCourseData';
import {ButtonGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {
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
                        title="Select Course"
                    >
                        {data.map(course => (
                            <Dropdown.Item key={course.value}>{course.value}</Dropdown.Item>
                        ))}
                    </DropdownType>
                ))}
            </div>
        </div>
    )
}