import 'react-native';
import React from 'react';
import Login from '../screens/login';

import {fireEvent,render} from '@testing-library/react-native';

it('renders login module', () => {
  const {getByTestId} = render(<Login />);
  fireEvent.press(getByTestId("loginBtn"))
});