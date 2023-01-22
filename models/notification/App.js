/* eslint-disable prettier/prettier */
import React, { useEffect,useState } from 'react';
import { Text, View,FlatList,Image, StatusBar,Animated,Dimensions } from 'react-native';
import {requestUserPermission,NotificationListener} from "./src/utils/pushnotification_helper"

const {width,height} = Dimensions.get('screen');


const App = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch('https://theaakashprojects.cf/welcome')
      .then(response => response.json())
      .then(data => 
        setData(data.data))
      .catch(error => console.log(error));

    requestUserPermission();
    NotificationListener();
  },[])

  const GetData = () => {
    fetch('https://theaakashprojects.cf/welcome')
      .then(response => response.json())
      .then(data => 
        setData(data.data))
      .catch(error => console.log(error));

    requestUserPermission();
    NotificationListener();
  }
  }

  return (

    <View style={{width}}>
      <StatusBar hidden />
      <Animated.FlatList
      data={data}
      horizontal
      onRefresh={() => GetData}
      scrollEventThrottle={32}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => 
      <View>

          <Image
            source={{uri: item.image}}
            style={{width,height}}
          />
        </View>
        }
      keyExtractor={item => item.id}
    />
    </View>
  )
}

export default App;