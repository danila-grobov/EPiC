import Table from "../frontend/src/table/Table";
import React from "react";
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {parse} from "qs";

const server = setupServer();

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
test('adds search phrase', () => {
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
    const {container} = await waitFor(() => render(<Table course={"CSC2033"}/>))
    const [searchInput] = container.getElementsByClassName("searchInput__input");
    fireEvent.change(searchInput, {target: {value: "test1"}});
    fireEvent.submit(searchInput);
    const filters = await new Promise(resolve => server.use(
        rest.get('/api/t/students', (req, res, ctx) => {
            const {filters} = parse(req.url.searchParams.toString());
            resolve(filters);
        })
    ));
    expect(filters.length).toBe(1);
});
