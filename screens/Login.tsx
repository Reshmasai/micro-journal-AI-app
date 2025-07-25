import { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import { supabase } from '../lib/supabase'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'

// Define navigation prop type for the Login screen using React Navigation
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

type Props = {
  navigation: LoginScreenNavigationProp
}

// Function to allow user to sign in or sign up with email and password
export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Function to handle login or sign up when the button is pressed
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      // If user doesn't exist, create account
      const { error: signupError } = await supabase.auth.signUp({ email, password })

      // If sign-up also fails, show an alert with the error message and exit
      if (signupError) return Alert.alert('Auth Error', signupError.message)
    }
   // replacing the current screen so user cannot go back to login
    navigation.replace('JournalInput')
  }

  // JSX rendering for email/password input fields and login button
  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      <Button title="Login / Sign Up" onPress={handleLogin} />
    </View>
  )
}
