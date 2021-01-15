import Table from "../frontend/src/table/Table";
import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';

test('opens and closes invite popup', () => {
    expect(screen.queryByTestId("invitePopup")).toBe(null);
    render(<Table course={"CSC2033"} />);
    fireEvent.click(screen.getByText('invite student'));
    expect(screen.queryByTestId("invitePopup")).not.toBe(null);
    fireEvent.click(screen.getByTestId("invitePopup__background"));
    expect(screen.queryByTestId("invitePopup")).toBe(null);
})