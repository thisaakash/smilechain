import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

   async function getFCMToken(){
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log(fcmtoken,"old token");
    if(!fcmtoken)
    {
        try{
            const fcmtoken = await messaging().getToken();
            if(fcmtoken){
               await AsyncStorage.setItem("fcmtoken",fcmtoken);
            }
            else{
    
            }
        }
        catch(error){
            console.log(error,"error in token");
        }
       
    }
}