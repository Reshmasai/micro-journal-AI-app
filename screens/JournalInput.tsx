import { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import { supabase } from '../lib/supabase'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'

// Define navigation prop type for the JournalInput screen using React Navigation
type JournalInputScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'JournalInput'>

type Props = {
  navigation: JournalInputScreenNavigationProp
}

// JournalInput screen component lets user write and submit a journal entry
export default function JournalInput({ navigation }: Props) {
  const [entry, setEntry] = useState('')

  // A simple mock sentiment analysis function based on keywords in the text
  const getMockSentiment = (text: string) => {
    const lower = text.toLowerCase()
    if (lower.includes('happy') || lower.includes('great') || lower.includes('joy')) return 'happy'
    if (lower.includes('sad') || lower.includes('cry') || lower.includes('bad')) return 'sad'
    if (lower.includes('anxious') || lower.includes('worried')) return 'anxious'
    return 'neutral'
  }

  // Function to submit the journal entry to Supabase
  const submitEntry = async () => {

    // Get sentiment tag from the entry text
    const sentiment = getMockSentiment(entry)

    // Get the currently logged-in user from Supabase Auth
    const user = (await supabase.auth.getUser()).data.user

    // Insert a new record into the 'entries' table with user_id, entry text, and sentiment_tag
    const { error } = await supabase.from('entries').insert({
      user_id: user?.id,
      entry_text: entry,
      sentiment_tag: sentiment,
    })

    // If there is an error inserting, show an alert with the error message
    if (error) Alert.alert('Error', error.message)
    else {
      Alert.alert('Entry saved!', `Sentiment: ${sentiment}`)
      setEntry('')

      // Navigate to the History screen to view all entries
      navigation.navigate('History')
    }
  }

  // JSX for rendering the input box and submit button
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Write your journal entry..."
        multiline
        numberOfLines={6}
        value={entry}
        onChangeText={setEntry}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Submit Entry" onPress={submitEntry} />
    </View>
  )
}
