import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../Containers/SignUp';

test('renders Sign Up form correctly', () => {
  const { getByText, getByPlaceholderText } = render(<SignUp />);

  expect(getByText('Sign Up')).toBeInTheDocument();
  expect(getByPlaceholderText('Enter Email')).toBeInTheDocument();
  expect(getByPlaceholderText('First name')).toBeInTheDocument();
  expect(getByPlaceholderText('Last name')).toBeInTheDocument();
  expect(getByPlaceholderText('Enter Password')).toBeInTheDocument();
  expect(getByPlaceholderText('Enter Phone Number')).toBeInTheDocument();
  
});

test('initial form values and errors', () => {
  const { getByPlaceholderText, queryByText } = render(<SignUp />);

  
  expect(getByPlaceholderText('First name').value).toBe('');
  expect(getByPlaceholderText('Last name').value).toBe('');
  expect(getByPlaceholderText('Enter Email').value).toBe('');
  expect(getByPlaceholderText('Enter Password').value).toBe('');
  expect(getByPlaceholderText('Enter Phone Number').value).toBe('');

  
  expect(queryByText('You must enter a valid email')).toBeNull();
  
});

test('displays error when invalid email is entered', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<SignUp />);

  const emailInput = getByPlaceholderText('Enter Email');
  fireEvent.change(emailInput, { target: { value: 'invalid_email' } });

  const verifyButton = getByText('Verify');
  fireEvent.click(verifyButton);

  await waitFor(() => {
    expect(queryByText('You must enter a valid email')).toBeInTheDocument();
  });
 
});

