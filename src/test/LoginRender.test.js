import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Containers/Login';

test('renders the Login form correctly', () => {
  const { getByText, getByPlaceholderText } = render(<Login />);

  expect(getByText('Sign In')).toBeInTheDocument();
  expect(getByPlaceholderText('Enter Email')).toBeInTheDocument();
  expect(getByPlaceholderText('Enter Password')).toBeInTheDocument();
  
});
