import Table from "../frontend/src/table/Table";
import React from "react";
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {parse} from "qs";
import TableContent from "../frontend/src/table/TableContent";
import '@testing-library/jest-dom';

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
    console.log("Please a request handler!");
}));
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
test('opens and closes invite popup', () => {
    render(<Table course={"CSC2033"}/>);
    expect(screen.queryByTestId("invitePopup")).toBe(null);
    fireEvent.click(screen.getByText('invite student'));
    expect(screen.queryByTestId("invitePopup")).not.toBe(null);
    fireEvent.click(screen.getByTestId("invitePopup__background"));
    expect(screen.queryByTestId("invitePopup")).toBe(null);
})
test('adds and removes search phrase', () => {
    const {container} = render(<Table course={"CSC2033"}/>);
    const [searchInput] = container.getElementsByClassName("searchInput__input");
    fireEvent.change(searchInput, {target: {value: "test1"}});
    fireEvent.submit(searchInput);
    fireEvent.change(searchInput, {target: {value: "test2"}});
    fireEvent.submit(searchInput);
    fireEvent.change(searchInput, {target: {value: "test3"}});
    fireEvent.submit(searchInput);
    const searchPhrases = container.getElementsByClassName("searchPhrase");
    expect(searchPhrases.length).toBe(3);
    screen.getByText("test1");
    screen.getByText("test2");
    screen.getByText("test3");
    const [removeButton] = searchPhrases[0].getElementsByClassName("searchPhrase__remove");
    fireEvent.click(removeButton);
    expect(screen.queryByText("test1")).toBe(null);
})
test('or filter formatting', () => {
    const {container} = render(<Table course={"CSC2033"}/>);
    const [searchInput] = container.getElementsByClassName("searchInput__input");
    fireEvent.change(searchInput, {target: {value: "test1 || test2"}});
    fireEvent.submit(searchInput);
    const [phrase] = container.getElementsByClassName("searchPhrase__title");
    expect(phrase.innerHTML).toBe(`test1<span class="searchPhrase__or">or</span>test2`);
});
test('sends request with filter', async () => {
    const {container} = await waitFor(() => render(<Table course={"CSC2033"}/>));
    const [searchInput] = container.getElementsByClassName("searchInput__input");
    let requestCounter = 0;
    const filters = new Promise(resolve => server.use(
        rest.get('/api/t/students', (req, res, ctx) => {
            requestCounter++;
            const {filters} = parse(req.url.searchParams.toString());
            requestCounter === 2 ? resolve(filters) : null;
        })
    )).then(filters => expect(filters.length).toBe(2));
    fireEvent.change(searchInput, {target: {value: "test1"}});
    fireEvent.submit(searchInput);
    fireEvent.change(searchInput, {target: {value: "test2"}});
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
            const titles = screen.getAllByTestId("row--title");
            expect(titles.length).toBe(5);
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
    const {container} = render(<TableContent selectedCheckboxes={[]} setSelectedCheckboxes={jest.fn()}
                                             setSortState={jest.fn()}
                                             data={[header, dataRow, dataRow2]} sortState={{}}/>);
    const firstDataRow = screen.queryByText(/^Nick$/).parentElement;
    expect(firstDataRow).toHaveTextContent(dataRow.map(({value}) => value).join(""));
    const secondDataRow = screen.queryByText(/^Chris$/).parentElement;
    expect(secondDataRow).toHaveTextContent(dataRow2.map(({value}) => value).join(""));
    expect(firstDataRow).toHaveClass("row--odd");
    expect(secondDataRow).toHaveClass("row--even");
});