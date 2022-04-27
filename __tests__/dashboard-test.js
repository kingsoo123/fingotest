import 'react-native';
import React from 'react';
import DashboardScreen from '../screens/dashboard';

import {fireEvent,render} from '@testing-library/react-native';

it('renders flash module', () => {
  const {getByTestId} = render(<DashboardScreen />);
  fireEvent.press(getByTestId("claimBtn"))
  fireEvent.press(getByTestId("RedeemBtn"))
  // fireEvent.press(getByTestId("loginBtn"))
});