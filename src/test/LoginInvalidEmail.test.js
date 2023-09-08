import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from '../Containers/Login';

test('displays error when invalid email is entered', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<Login />);

  const emailInput = getByPlaceholderText('Enter Email');
  fireEvent.change(emailInput, { target: { value: 'invalid_email' } });

  const passwordInput = getByPlaceholderText('Enter Password');
  fireEvent.change(passwordInput, { target: { value: 'valid_password' } });

  const signInButton = getByText('Sign In');
  fireEvent.click(signInButton);

  await screen.findByText('You must enter a valid email');

  expect(queryByText('Password must be at least 8 characters long')).toBeNull();
});
