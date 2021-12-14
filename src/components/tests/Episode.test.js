import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const data = {
    id: 909347,
    image: "https://static.tvmaze.com/uploads/images/medium_landscape/132/332055.jpg",
    name: "Chapter Seven: The Lost Sister",
    season: 2,
    number: 7,
    summary: "El travels to Chicago to find her sister Eight, aka Kali, who has teamed up with other outcasts to kill the men who tormented her at Hawkins Labs.",
    runtime: 46
}


test("renders without error", () => {
    render(<Episode episode={data} />);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={data}/>);

    const sum = screen.queryByText(/El travels to Chicago to find her sister Eight, aka Kali, who has teamed up with other outcasts to kill the men who tormented her at Hawkins Labs/i);

    expect(sum).toBeTruthy();
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={data} />);

});
