import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Reset from '../Containers/Reset';

test('renders the Reset form correctly', () => {
  const { getByText, getByPlaceholderText } = render(<Reset />);

  expect(getByText('Reset Password')).toBeInTheDocument();
  expect(getByPlaceholderText('Enter new password')).toBeInTheDocument();
  expect(getByPlaceholderText('confirm password')).toBeInTheDocument();
});

test('initial form values and errors', () => {
  const { getByPlaceholderText, queryByText } = render(<Reset />);

 
  expect(getByPlaceholderText('Enter new password').value).toBe('');
  expect(getByPlaceholderText('confirm password').value).toBe('');

  
  expect(queryByText('You must enter a password')).toBeNull();
});

test('displays error when invalid passwords are entered and shows success toast on successful reset', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<Reset />);

  const newPasswordInput = getByPlaceholderText('Enter new password');
  const confirmPasswordInput = getByPlaceholderText('confirm password');

  fireEvent.change(newPasswordInput, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'different_password' } });

  const resetButton = getByText('Reset');
  fireEvent.click(resetButton);

  await waitFor(() => {
   
    expect(queryByText('Passwords do not match')).toBeInTheDocument();
  });

  
  fireEvent.change(newPasswordInput, { target: { value: '' } });
  fireEvent.change(confirmPasswordInput, { target: { value: '' } });

  
  fireEvent.change(newPasswordInput, { target: { value: 'valid_password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'valid_password' } });

  fireEvent.click(resetButton);

  await waitFor(() => {
    
    expect(queryByText('Password reset successful! You can now log in with your new password.')).toBeInTheDocument();
  });
});
