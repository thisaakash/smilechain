import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log(fcmtoken, 'old token');
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      } else {
      }
    } catch (error) {
      console.log(error, 'error in token');
    }
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage, 'log here');
//     const notification = new firebase.notifications.Notification()
//     .setNotificationId(remoteMessage.messageId)
//     .setTitle(remoteMessage.data.title)
//     .setBody(remoteMessage.data.body)
//     .setData(remoteMessage.data);

//   // Display the notification
//   notification.android.setChannelId('channelId')
//   notification.android.setSmallIcon('ic_notification')
//   notification.android.setAutoCancel(true);
  
//   firebase.notifications().displayNotification(notification);
  });
};
