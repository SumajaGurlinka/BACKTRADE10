import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Containers/Login';

test('initial form values and errors', () => {
  const { getByPlaceholderText, queryByText } = render(<Login />);

  expect(getByPlaceholderText('Enter Email').value).toBe('');
  expect(getByPlaceholderText('Enter Password').value).toBe('');

 
  expect(queryByText('You must enter a valid email')).toBeNull();
  expect(queryByText('Password must be at least 8 characters long')).toBeNull();
});
