/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
import TouchID from 'react-native-touch-id';
const App = () => {
  const [isAuth, SetIsAuth] = useState(false);

  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  useEffect(() => {
    console.log('hi');
    handleBiometric();
  });

  const handleBiometric = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          if (isAuth) {
            return null;
          }
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              console.log('success', success);
              SetIsAuth(success);
            })
            .catch(err => {
              BackHandler.exitApp();
            });
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default App;
