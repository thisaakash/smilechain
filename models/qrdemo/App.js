/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Text, View, Linking} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const App = () => {
  const [value, setValue] = useState('');
  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });
    const handleDeepLink = async url => {
      console.log(url);
      console.log(url.url);
      const newValue = url.url.split('/').pop();
      console.log(newValue);

      setValue(newValue);
    };

    return () => {
      linkingEvent.remove();
    };
  }, []);

  return (
    <View>
      <Text style={{fontSize: 50}}>Your Username is {value}</Text>
      <QRCode
        value="Just some string value"
        logo={{
          uri: 'https://assets.stickpng.com/images/584290baa6515b1e0ad75ac2.png',
        }}
        logoSize={120}
        logoMargin={10}
        size={350}
      />
    </View>
  );
};

export default App;
