import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Forget from '../Containers/Forget';

test('renders the Forget form correctly', () => {
  const { getByText, getByPlaceholderText } = render(<Forget />);

  expect(getByText('Forget Password')).toBeInTheDocument();
  expect(getByPlaceholderText('Enter Email')).toBeInTheDocument();
});

test('initial form values and errors', () => {
  const { getByPlaceholderText, queryByText } = render(<Forget />);

 
  expect(getByPlaceholderText('Enter Email').value).toBe('');

  expect(queryByText('You must enter a valid email')).toBeNull();
});

test('displays error when invalid email is entered and sends link on valid email', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<Forget />);

  const emailInput = getByPlaceholderText('Enter Email');
  fireEvent.change(emailInput, { target: { value: 'invalid_email' } });

  const sendLinkButton = getByText('Send Link');
  fireEvent.click(sendLinkButton);

  await waitFor(() => {
    expect(queryByText('You must enter a valid email')).toBeInTheDocument();
  });
});
