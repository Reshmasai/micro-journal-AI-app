import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import JournalInput from './screens/JournalInput'
import History from './screens/History'
import { RootStackParamList } from './types'
import { registerForPushNotificationsAsync, scheduleDailyReminder, sendTestNotificationNow } from './lib/notifications'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
// Set up how notifications are handled when received while the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,   
    shouldSetBadge: false,   
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

// Create the navigation stack with typed param list
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  // On app mount, register for push notifications and send a test notification
  useEffect(() => {
  registerForPushNotificationsAsync().then(() => {
    sendTestNotificationNow() // immediate push for testing
    // scheduleDailyReminder(21) // 9 PM daily
  })
}, [])

  // Render navigation container with stack navigator and screens
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="JournalInput" component={JournalInput} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
