import React from 'react';
import {AppRegistry,LogBox, ToastAndroid} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);