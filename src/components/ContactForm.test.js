import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    //Arrange
    render(<ContactForm/>);
    //Act
    const header = screen.getByText("Contact Form")
    //console.log(header);
    //Assert
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, "1");

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    await waitFor(()=>{
        const errorMessage = screen.queryAllByTestId("error");
        expect(errorMessage).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, "garin");

    const LastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(LastNameInput, "mccullick");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessage = await screen.getAllByTestId("error");
    expect(errorMessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, 'mccullick@gmail.com');

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<contactForm />);
    const lastField = screen.getByLabelText(/last name*/i)
});