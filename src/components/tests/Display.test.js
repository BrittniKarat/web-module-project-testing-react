import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import fetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const data = {
    name: "",
    summary: "",
    seasons: [
        { id: 1, name: "caterpillar", episodes: [] },
        { id: 2, name: "cocoon", episodes: [] },
        { id: 3, name: "butterfly", episodes: [] }
    ]
}

test('renders without errors with no props', () => {
    render(<Display />);
});

test('renders Show component when the button is clicked ', async () => {
    fetchShow.mockResolvedValueOnce(data);

    render(<Display show={data} />);

    const button = screen.getByRole('button');
    userEvent.click(button);
    const showComponent = await screen.findByTestId("show-container");

    expect(showComponent).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    fetchShow.mockResolvedValueOnce(data);

    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);
    
    await waitFor(() => {
        const seasons = screen.getAllByTestId("season-option");
        expect(seasons).toHaveLength(3);
    });
});

test('displayFunc is called when the fetch button is pressed', async () => {
    fetchShow.mockResolvedValueOnce(data);

    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc} />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    });
});