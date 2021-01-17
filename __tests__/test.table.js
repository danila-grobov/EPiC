import Table from "../frontend/src/table/Table";
import React, {useState} from "react";
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {parse} from "qs";
import TableContent from "../frontend/src/table/TableContent";
import '@testing-library/jest-dom';
import SearchArea from "../frontend/src/table/SearchArea";
import userEvent from "@testing-library/user-event";

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
const server = setupServer(rest.get("*", (req, res, ctx) => {
    console.log("Please use a request handler!");
}));
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
test('opens and closes invite popup', () => {
    server.use(rest.get('/api/t/students',(req,res,ctx) => {
        return res(ctx.status(500));
    }))
    render(<Table course={"CSC2033"}/>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button",{name:/invite student/i}));
    expect(screen.queryByRole("dialog")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Close dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
})
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
    render(<SearchArea filters={["test1 || test2"]} />);
    expect(screen.getByRole("listitem", {name: /filter/i})).toHaveTextContent(/test1ortest2/i);
});
test('sends request with filter', async () => {
    await waitFor(() => render(<Table course={"CSC2033"}/>));
    const searchInput = screen.getByRole("search");
    let requestCounter = 0;
    new Promise(resolve => server.use(
        rest.get('/api/t/students', (req, res, ctx) => {
            requestCounter++;
            const {filters} = parse(req.url.searchParams.toString());
            requestCounter === 2 ? resolve(filters) : null;
        })
    )).then(filters => expect(filters).toHaveLength(2));
    userEvent.type(searchInput, "test1");
    fireEvent.submit(searchInput);
    userEvent.type(searchInput, "test2");
    fireEvent.submit(searchInput);
});
test('displays header row', async () => {
    server.use(
        rest.get('/api/t/students', (req, res, ctx) => {
            return res(ctx.json({
                students: [header, dataRow],
                count: 0
            }));
        })
    );
    render(<Table course={"CSC2033"}/>);
    await waitFor(() => {
            const titles = screen.getAllByRole("columnheader");
            expect(titles).toHaveLength(5);
        }
    );
})
test('displays no students message', async () => {
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
    const [firstDataRow, secondDataRow] = screen.getAllByRole(/row/i, {name:/table row/i});
    expect(firstDataRow).toHaveTextContent(dataRow.map(({value}) => value).join(""));
    expect(secondDataRow).toHaveTextContent(dataRow2.map(({value}) => value).join(""));
    expect(firstDataRow).toHaveClass("row--odd");
    expect(secondDataRow).toHaveClass("row--even");
});