import {useState, useEffect} from "react";
import {stringify} from "qs";
import axios from "axios_redirect";
import {toast} from "react-toastify";
// Manages and updates all states related to Table component
export default course => {
    const [popupState, setPopupState] = useState(false);
    const [total, setTotal] = useState(0);
    const [rowCount, setRowCount] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState([]);
    const [sortState, setSortState] = useState({index: -1, ascending: true});
    const [studentData, setStudentData] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    //Get data from the server
    const fetchData = async () => {
        try {
            const offset = (currentPage - 1) * rowCount; // The first element of the data to retrieve
            const {data} = await axios.get("/api/t/students", {
                params: {count: rowCount, offset, course, filters, sortState},
                // axios doesn't support arrays in params, this is a workaround
                paramsSerializer: params => stringify(params)
            })
            return data;
        } catch (error) {
            toast.error("Unexpected error occurred, when trying to load students' data.");
            return {};
        }
    }
    //Fetch data and update the states with the results.
    const updateTable = () => {
        fetchData().then(({students, count}) => {
            setStudentData(students);
            setTotal(count);
        })
    };
    useEffect(
        updateTable,
        [rowCount, currentPage, filters, popupState, course, sortState]
    );
    //Get emails from row which were selected
    const getSelectedEmails = () => {
        return selectedCheckboxes
            .filter(id => id !== 0)
            .map(id => studentData[id][3].value)
            .filter(email => email !== "")
    }
    return {
        getSelectedEmails,
        updateTable,
        popupIsOpen: popupState,
        closePopup: () => setPopupState(false),
        openPopup: () => setPopupState(true),
        total,
        rowCount, setRowCount,
        currentPage, setCurrentPage,
        filters, setFilters,
        sortState, setSortState,
        studentData, setStudentData,
        selectedCheckboxes, setSelectedCheckboxes,
        resetCheckboxes: () => setSelectedCheckboxes([])
    }
}
