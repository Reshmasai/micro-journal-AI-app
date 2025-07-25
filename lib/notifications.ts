import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

// Ask for push notification permissions and return the Expo push token if granted
export async function registerForPushNotificationsAsync() {

  // Request permission from the user to show notifications
  const { status } = await Notifications.requestPermissionsAsync()

  // If the user denied permission, show an alert and exit
  if (status !== 'granted') {
    alert('Permission not granted for notifications.')
    return null
  }

   // If permission is granted, get the Expo push token (unique to this device + app)
  const tokenData = await Notifications.getExpoPushTokenAsync()

  // check in console
  console.log('Push token:', tokenData.data)

  return tokenData.data
}

//Schedule a daily reminder at the given hour (default 9PM)
export async function scheduleDailyReminder(hour: number = 21) {
  await Notifications.scheduleNotificationAsync({

     // Define the content of the notification
    content: {
      title: "Don't forget to journal!",
      body: "Write your thoughts for today",
    },
    // Set the trigger for the notification
    trigger: {
      type: 'calendar',
      hour,
      minute: 0,
      repeats: true,
    } as Notifications.CalendarTriggerInput,
  })
}

//logic to test - Send a test notification instantly
  export async function sendTestNotificationNow() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test Notification",
      body: "This is a test push message.",
    },
    trigger: null,
  })
}

