import Table from "../frontend/src/table/Table";
import React from "react";
import {
    render,
    fireEvent,
    screen,
    act
} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import TableContent from "../frontend/src/table/TableContent";
import '@testing-library/jest-dom';
import SearchArea from "../frontend/src/table/SearchArea";
import userEvent from "@testing-library/user-event";
import Row from "../frontend/src/table/Row";
import TablePagination from "../frontend/src/table/TablePagination";
import path from "path";
import FileInput from "../frontend/src/general_components/FileInput";
import {ToastContainer} from "react-toastify";
import InvitePopup from "../frontend/src/table/InvitePopup";
import FancyInput from "../frontend/src/general_components/TextInput/FancyInput";

const server = setupServer(rest.get('/api/t/students',
    (req, res, ctx) => {
        return res(ctx.json({
            students: [header, dataRow],
            count: 0
        }));
    }))
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const header = [
    {value: "First name", type: "title"},
    {value: "Last name", type: "title"},
    {value: "Username", type: "title"},
    {value: "Email", type: "title"},
    {value: "Status", type: "title"}
];
const dataRow = [
    {value: "Nick", type: "text"},
    {value: "Cook", type: "text"},
    {value: "nickcook", type: "text"},
    {value: "nick.cook@ncl.ac.uk", type: "text"},
    {value: "waiting", type: "warning"}
];
const dataRow2 = [
    {value: "Chris", type: "text"},
    {value: "Napier", type: "text"},
    {value: "chrisnapier", type: "text"},
    {value: "c.napier@ncl.ac.uk", type: "text"},
    {value: "waiting", type: "warning"}
];
describe("InvitePopup", () => {
    test('opens and closes invite popup', async () => {
        server.use(rest.get('/api/t/students',
            (req, res, ctx) => {
                return res(ctx.status(500));
            }));
        await render(<Table course={"CSC2033"}/>);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        act(() => userEvent.click(screen.getByRole("button", {name: /invite student/i})));
        expect(screen.queryByRole("dialog")).toBeInTheDocument();
        act(() => userEvent.click(screen.getByLabelText("Close dialog")));
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    })
})
describe("SearchArea", () => {
    test('adds and removes search phrase', () => {
        const {rerender} = render(<SearchArea filters={[]} setFilters={
            filters => expect(filters[0]).toBe("input test")}/>);
        const searchInput = screen.getByRole("textbox");
        userEvent.type(searchInput, 'input test');
        fireEvent.submit(searchInput);
        rerender(<SearchArea filters={["input test"]}/>);
        expect(screen.getByRole("listitem", {name: /filter/i})).toHaveTextContent(/input test/i);
        rerender(<SearchArea filters={["input test"]} setFilters={
            filters => expect(filters).toHaveLength(0)
        }/>);
        userEvent.click(screen.getByRole("button", {name: /remove filter/i}))
    })
    test('or filter formatting', () => {
        render(<SearchArea filters={["test1 || test2"]}/>);
        expect(screen.getByRole("listitem", {name: /filter/i})).toHaveTextContent(/test1ortest2/i);
    });
})
describe("TableContent", () => {
    test('displays header row', async () => {
        await render(<Table course={"CSC2033"}/>);
        const headers = await screen.findAllByRole("columnheader");
        expect(headers).toHaveLength(5);
    })
    test('displays no students message', () => {
        const {rerender} = render(<TableContent data={[]}/>)
        expect(screen.getByText(/No students in the system/i)).toBeInTheDocument();
        rerender(<TableContent selectedCheckboxes={[]} setSelectedCheckboxes={jest.fn()} setSortState={jest.fn()}
                               data={[header]} sortState={{}}/>);
        expect(screen.getByText(/No students in the system/i)).toBeInTheDocument();
        rerender(<TableContent selectedCheckboxes={[]} setSelectedCheckboxes={jest.fn()} setSortState={jest.fn()}
                               data={[header, dataRow]} sortState={{}}/>);
        expect(screen.queryByText(/No students in the system/i)).not.toBeInTheDocument();
    });
    test('arranges data correctly in the table', () => {
        render(<TableContent selectedCheckboxes={[]} setSelectedCheckboxes={jest.fn()}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        const [firstDataRow, secondDataRow] = screen.getAllByRole(/row/i, {name: /table row/i});
        expect(firstDataRow).toHaveTextContent(dataRow.map(({value}) => value).join(""));
        expect(secondDataRow).toHaveTextContent(dataRow2.map(({value}) => value).join(""));
        expect(firstDataRow).toHaveClass("row--odd");
        expect(secondDataRow).toHaveClass("row--even");
    });
})
describe("Checkboxes", () => {
    test('tick one checkbox', () => {
        render(<TableContent selectedCheckboxes={[]}
                             setSelectedCheckboxes={index => expect(index).toEqual([1])}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        userEvent.click(screen.getAllByRole(/checkbox/i, {name: /selects a row/i})[1]);
    });
    test('tick master checkbox', () => {
        render(<TableContent selectedCheckboxes={[]}
                             setSelectedCheckboxes={index => expect(index).toEqual([0, 1, 2])}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        userEvent.click(screen.getAllByRole(/checkbox/i, {name: /selects a row/i})[0]);
    });
    test('un-tick checkbox', () => {
        render(<TableContent selectedCheckboxes={[1]}
                             setSelectedCheckboxes={index => expect(index).toEqual([])}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        userEvent.click(screen.getAllByRole(/checkbox/i, {name: /selects a row/i})[1]);
    });
    test('displays partially checked master checkbox', () => {
        render(<TableContent selectedCheckboxes={[1]} setSelectedCheckboxes={jest.fn()}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        const [masterCheckbox, checkbox1, checkbox2] = screen.getAllByRole(/checkbox/i, {name: /selects a row/i});
        expect(masterCheckbox).toBePartiallyChecked();
        expect(checkbox1).toBeChecked();
        expect(checkbox2).not.toBeChecked();
    })
    test('displays fully checked master checkbox', () => {
        render(<TableContent selectedCheckboxes={[0, 1, 2]} setSelectedCheckboxes={jest.fn()}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        const [masterCheckbox, checkbox1, checkbox2] = screen.getAllByRole(/checkbox/i, {name: /selects a row/i});
        expect(masterCheckbox).toBeChecked();
        expect(checkbox1).toBeChecked();
        expect(checkbox2).toBeChecked();
    })
})
describe("Status label", () => {
    test("display accepted label", () => {
        render(<Row values={[...dataRow.slice(0, -1), {value: "accepted", type: "info"}]}/>);
        expect(screen.getByRole(/cell/i, {name: /accepted/i})).toHaveClass("row__cell--info");
    })
    test("display waiting label", () => {
        render(<Row values={[...dataRow.slice(0, -1), {value: "waiting", type: "warning"}]}/>);
        expect(screen.getByRole(/cell/i, {name: /waiting/i})).toHaveClass("row__cell--warning");
    })
    test("display canceled label", () => {
        render(<Row values={[...dataRow.slice(0, -1), {value: "canceled", type: "danger"}]}/>);
        expect(screen.getByRole(/cell/i, {name: /canceled/i})).toHaveClass("row__cell--danger");
    })
})
describe("Sorting buttons", () => {
    test("display ascending button", () => {
        render(<Row values={header} rowType={"header"} sortState={{index: 0, ascending: true}}
                    setSortState={state => expect(state.ascending).toBe(false)}/>);
        const firstSortCheckbox = screen.getAllByRole("checkbox", {name: /changes sort state/i})[0];
        expect(firstSortCheckbox).toBeChecked();
        userEvent.click(firstSortCheckbox);
    })
    test("display descending button", () => {
        render(<Row values={header} rowType={"header"} sortState={{index: 0, ascending: false}}
                    setSortState={state => expect(state.ascending).toBe(true)}/>);
        const firstSortCheckbox = screen.getAllByRole("checkbox", {name: /changes sort state/i})[0];
        expect(firstSortCheckbox).not.toBeChecked();
        userEvent.click(firstSortCheckbox);
    })
    test("display idle button", () => {
        render(<Row values={header} rowType={"header"} sortState={{index: -1, ascending: true}}
                    setSortState={state => expect(state.ascending).toBe(false)}/>);
        const firstSortCheckbox = screen.getAllByRole("checkbox", {name: /changes sort state/i})[0];
        expect(firstSortCheckbox).toBePartiallyChecked();
        userEvent.click(firstSortCheckbox);
    })
})
describe("Pagintaion", () => {
    const getPaginationElements = screen => ({
        pageNumbers: screen.getAllByRole("button", {name: /page-number/i}),
        firstPageArrow: screen.getByRole('img', {name: "left double arrow"}),
        prevPageArrow: screen.getByRole('img', {name: "left arrow"}),
        lastPageArrow: screen.getByRole('img', {name: "right double arrow"}),
        nextPageArrow: screen.getByRole('img', {name: "right arrow"})
    })
    test("displays pagination with first page as current", () => {
        render(<TablePagination rowCount={5} total={60} currentPage={1}/>);
        const {
            pageNumbers,
            firstPageArrow,
            prevPageArrow,
            lastPageArrow,
            nextPageArrow
        } = getPaginationElements(screen);
        expect(path.basename(firstPageArrow.src, '.svg')).toBe("doubleArrow_disabled");
        expect(path.basename(prevPageArrow.src, '.svg')).toBe("arrow_disabled");
        expect(pageNumbers[0]).toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[1]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[2]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[3]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[4]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(path.basename(lastPageArrow.src, '.svg')).toBe("doubleArrow");
        expect(path.basename(nextPageArrow.src, '.svg')).toBe("Arrow");
    })
    test("displays pagination with current page at the middle", () => {
        render(<TablePagination rowCount={5} total={60} currentPage={5}/>);
        const {
            pageNumbers,
            firstPageArrow,
            prevPageArrow,
            lastPageArrow,
            nextPageArrow
        } = getPaginationElements(screen);

        expect(path.basename(firstPageArrow.src, '.svg')).toBe("doubleArrow");
        expect(path.basename(prevPageArrow.src, '.svg')).toBe("Arrow");
        expect(pageNumbers[0]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[1]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[2]).toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[3]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[4]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(path.basename(lastPageArrow.src, '.svg')).toBe("doubleArrow");
        expect(path.basename(nextPageArrow.src, '.svg')).toBe("Arrow");
    })

    test("displays pagination with current page at the end", () => {
        render(<TablePagination rowCount={5} total={60} currentPage={12}/>);
        const {
            pageNumbers,
            firstPageArrow,
            prevPageArrow,
            lastPageArrow,
            nextPageArrow
        } = getPaginationElements(screen);

        expect(path.basename(firstPageArrow.src, '.svg')).toBe("doubleArrow");
        expect(path.basename(prevPageArrow.src, '.svg')).toBe("Arrow");
        expect(pageNumbers[0]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[1]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[2]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[3]).not.toHaveClass('tablePagination__pageNumber--current');
        expect(pageNumbers[4]).toHaveClass('tablePagination__pageNumber--current');
        expect(path.basename(lastPageArrow.src, '.svg')).toBe("doubleArrow_disabled");
        expect(path.basename(nextPageArrow.src, '.svg')).toBe("arrow_disabled");
    })
    test("manipulates pagination with buttons", () => {
        const {rerender} = render(<TablePagination rowCount={5} total={60} currentPage={1}
                                                   setCurrentPage={currentPage => expect(currentPage).toBe(2)}/>);
        const {nextPageArrow} = getPaginationElements(screen);
        userEvent.click(nextPageArrow);
        rerender(<TablePagination rowCount={5} total={60} currentPage={3}
                                  setCurrentPage={currentPage => expect(currentPage).toBe(2)}/>);
        const {prevPageArrow} = getPaginationElements(screen);
        userEvent.click(prevPageArrow);
        rerender(<TablePagination rowCount={5} total={60} currentPage={9}
                                  setCurrentPage={currentPage => expect(currentPage).toBe(1)}/>);
        const {firstPageArrow} = getPaginationElements(screen);
        userEvent.click(firstPageArrow);
        rerender(<TablePagination rowCount={5} total={60} currentPage={9}
                                  setCurrentPage={currentPage => expect(currentPage).toBe(12)}/>);
        const {lastPageArrow} = getPaginationElements(screen);
        userEvent.click(lastPageArrow);
        rerender(<TablePagination rowCount={5} total={60} currentPage={5}
                                  setCurrentPage={currentPage => expect(currentPage).toBe(3)}/>);
        const {pageNumbers} = getPaginationElements(screen);
        userEvent.click(pageNumbers[0]);
    })

})
describe("Grade import", () => {
    test("uploads a valid file with grades", async () => {
        const sentData = {
            data: [
                {
                    email: "test1@ncl.ac.uk",
                    grade: 33
                },
                {
                    email: "test2@ncl.ac.uk",
                    grade: 100
                }
            ]
        };
        let parsedData = {};
        render(<FileInput type={"grades"} setFileData={data => parsedData = data} button={<button/>}
                          successMessage={"test success"}/>);
        render(<ToastContainer/>)
        const gradesInput = screen.getByLabelText("file input");
        userEvent.upload(gradesInput,
            new File([JSON.stringify(sentData)], "grades.json", {type: "application/json"}));
        await screen.findByText("test success");
        expect(parsedData).toEqual(sentData.data);
    })

    test("uploads incorrectly formatted file", async () => {
        const sentData = {
            data: [
                {
                    notEmail: "James",
                    lastName: "Bond"
                }
            ]
        };
        let parsedData = {};
        render(<FileInput type={"grades"} setFileData={data => parsedData = data} button={<button/>}
                          successMessage={"test success"}/>);
        render(<ToastContainer/>)
        const gradesInput = screen.getByLabelText("file input");
        userEvent.upload(gradesInput,
            new File([JSON.stringify(sentData)], "grades.json", {type: "application/json"}));
        await screen.findByText("The file format is not valid.");
    })

    test("uploads unsupported file format", async () => {
        render(<FileInput type={"grades"} setFileData={() => {
        }} button={<button/>}
                          successMessage={"test success"}/>);
        render(<ToastContainer/>)
        const gradesInput = screen.getByLabelText("file input");
        userEvent.upload(gradesInput,
            new File(["echo 'Agent 007';"], "index.php", {type: "application/x-httpd-php"}));
        await screen.findByText("Please upload a json file.");
    })
})
describe("Invite Popup", () => {
    test("email input helper", async () => {
        let currentValue = "value";
        render(<FancyInput type={"email"} value={currentValue} setValue={newValue => currentValue = newValue}/>);
        const emailInput = screen.getByRole("textbox");
        emailInput.focus();
        fireEvent.change(emailInput, {target: {value: 'email'}})
        expect(screen.queryByText("@ncl.ac.uk")).toBeInTheDocument();
        fireEvent.change(emailInput, {target: {value: 'email@'}})
        expect(screen.queryByText("@ncl.ac.uk")).not.toBeInTheDocument();
        expect(screen.queryByText("ncl.ac.uk")).toBeInTheDocument();
        fireEvent.change(emailInput, {target: {value: 'email'}})
        fireEvent.keyDown(emailInput, {code: "ArrowRight"});
        expect(currentValue).toBe("value@ncl.ac.uk");
    })
    test("email validation", async () => {
        render(<InvitePopup/>);
        const emailInput = screen.getByRole("textbox");
        expect(screen.queryByText("Please enter a valid newcastle university email address.")).not.toBeInTheDocument();
        fireEvent.change(emailInput, {target: {value: 'email'}})
        fireEvent.submit(emailInput);
        expect(screen.queryByText("Please enter a valid newcastle university email address.")).toBeInTheDocument();
        fireEvent.change(emailInput, {target: {value: 'email@ncl.ac.uk'}})
        fireEvent.submit(emailInput);
        expect(screen.queryByText("Please enter a valid newcastle university email address.")).not.toBeInTheDocument();
    })
})