import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText(/contact form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Hi");

  const firstNameValidation = screen.getByText(
    /Error: firstName must have at least 5 characters./i
  );
  expect(firstNameValidation).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const submitFormButton = screen.getByRole("button");
  userEvent.click(submitFormButton);

  const firstNameValidation = screen.getByText(
    /Error: firstName must have at least 5 characters./i
  );
  expect(firstNameValidation).toBeInTheDocument();
  const lastNameValidation = screen.getByText(
    /Error: lastName is a required field./i
  );
  expect(lastNameValidation).toBeInTheDocument();
  const emailValidation = screen.getByText(
    /Error: email must be a valid email address./i
  );
  expect(emailValidation).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Qwerty");
  const lastNameInput = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastNameInput, "Please");
  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "j");

  const emailValidation = screen.getByText(
    /Error: email must be a valid email address./i
  );
  expect(emailValidation).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "j");

  const emailValidation = screen.getByText(
    /Error: email must be a valid email address./i
  );
  expect(emailValidation).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Qwerty");
  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "email@email.com");
  const submitFormButton = screen.getByRole("button");
  userEvent.click(submitFormButton);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, "Qwerty");
  const lastNameInput = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastNameInput, "Please");
  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, "email@email.com");
  const submitFormButton = screen.getByRole("button");
  userEvent.click(submitFormButton);

  const submittedForm = screen.getByText(/You submitted:/i);
  expect(submittedForm).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    
});