import Table from "../frontend/src/table/Table";
import React, {useState} from "react";
import {render, fireEvent, screen, waitFor, cleanup} from '@testing-library/react';
import {rest, setupWorker} from 'msw'
import {setupServer} from 'msw/node'
import {parse} from "qs";
import TableContent from "../frontend/src/table/TableContent";
import '@testing-library/jest-dom';
import SearchArea from "../frontend/src/table/SearchArea";
import userEvent from "@testing-library/user-event";
import Row from "../frontend/src/table/Row";

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
    test('opens and closes invite popup', () => {
        render(<Table course={"CSC2033"}/>);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        userEvent.click(screen.getByRole("button", {name: /invite student/i}));
        expect(screen.queryByRole("dialog")).toBeInTheDocument();
        userEvent.click(screen.getByLabelText("Close dialog"));
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
    test('sends request with filter', async () => {
        const server = setupServer(
            rest.get('/api/t/students', (req, res, ctx) => {
                const {filters} = parse(req.url.searchParams.toString());
                expect(filters).toHaveLength(2);
            })
        );
        await render(<Table course={"CSC2033"}/>);
        const searchInput = screen.getByRole("search");
        userEvent.type(searchInput, "test1");
        fireEvent.submit(searchInput);
        userEvent.type(searchInput, "test2");
        await server.listen();
        fireEvent.submit(searchInput);
        await server.close();
    });
})
describe("TableContent", () => {
    test('displays header row', async () => {
        const server = setupServer(
            rest.get('/api/t/students',
                (req, res, ctx) => {
                    return res(ctx.json({
                        students: [header, dataRow],
                        count: 0
                    }));
            })
        );
        await server.listen();
        await render(<Table course={"CSC2033"}/>);
        await server.close();
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
        userEvent.click(screen.getAllByRole(/checkbox/i, {name:/selects a row/i})[1]);
    });
    test('tick master checkbox', () => {
        render(<TableContent selectedCheckboxes={[]}
                             setSelectedCheckboxes={index => expect(index).toEqual([0, 1, 2])}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        userEvent.click(screen.getAllByRole(/checkbox/i,{name:/selects a row/i})[0]);
    });
    test('un-tick checkbox', () => {
        render(<TableContent selectedCheckboxes={[1]}
                             setSelectedCheckboxes={index => expect(index).toEqual([])}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        userEvent.click(screen.getAllByRole(/checkbox/i,{name:/selects a row/i})[1]);
    });
    test('displays partially checked master checkbox', () => {
        render(<TableContent selectedCheckboxes={[1]} setSelectedCheckboxes={jest.fn()}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        const [masterCheckbox, checkbox1, checkbox2] = screen.getAllByRole(/checkbox/i, {name:/selects a row/i});
        expect(masterCheckbox).toBePartiallyChecked();
        expect(checkbox1).toBeChecked();
        expect(checkbox2).not.toBeChecked();
    })
    test('displays fully checked master checkbox', () => {
        render(<TableContent selectedCheckboxes={[0, 1, 2]} setSelectedCheckboxes={jest.fn()}
                             setSortState={jest.fn()}
                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
        const [masterCheckbox, checkbox1, checkbox2] = screen.getAllByRole(/checkbox/i,{name:/selects a row/i});
        expect(masterCheckbox).toBeChecked();
        expect(checkbox1).toBeChecked();
        expect(checkbox2).toBeChecked();
    })
})
describe("Status label", () => {
    test("display accepted label", () => {
        render(<Row values={[...dataRow.slice(0,-1),{value:"accepted", type:"info"}]}/>);
        expect(screen.getByRole(/cell/i, {name: /accepted/i})).toHaveClass("row__cell--info");
    })
    test("display waiting label", () => {
        render(<Row values={[...dataRow.slice(0,-1),{value:"waiting", type:"warning"}]}/>);
        expect(screen.getByRole(/cell/i, {name: /waiting/i})).toHaveClass("row__cell--warning");
    })
    test("display canceled label", () => {
        render(<Row values={[...dataRow.slice(0,-1),{value:"canceled", type:"danger"}]}/>);
        expect(screen.getByRole(/cell/i, {name: /canceled/i})).toHaveClass("row__cell--danger");
    })
})
describe("Sorting buttons", () => {
    test("display ascending button", () => {
        render(<Row values={header} rowType={"header"} sortState={{index:0,ascending:true}}
                    setSortState={state => expect(state.ascending).toBe(false)}/>);
        const firstSortCheckbox = screen.getAllByRole("checkbox", {name:/changes sort state/i})[0];
        expect(firstSortCheckbox).toBeChecked();
        userEvent.click(firstSortCheckbox);
    })
    test("display descending button", () => {
        render(<Row values={header} rowType={"header"} sortState={{index:0,ascending:false}}
                    setSortState={state => expect(state.ascending).toBe(true)}/>);
        const firstSortCheckbox = screen.getAllByRole("checkbox", {name:/changes sort state/i})[0];
        expect(firstSortCheckbox).not.toBeChecked();
        userEvent.click(firstSortCheckbox);
    })
    test("display idle button", () => {
        render(<Row values={header} rowType={"header"} sortState={{index:-1,ascending:true}}
                    setSortState={state => expect(state.ascending).toBe(false)}/>);
        const firstSortCheckbox = screen.getAllByRole("checkbox", {name:/changes sort state/i})[0];
        expect(firstSortCheckbox).toBePartiallyChecked();
        userEvent.click(firstSortCheckbox);
    })
})
