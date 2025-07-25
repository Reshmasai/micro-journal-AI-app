import { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { supabase } from '../lib/supabase'
import dayjs from 'dayjs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'

// Define the journal entry object
type Entry = {
  id: string
  entry_text: string
  sentiment_tag: string
  created_at: string
}

// Define the navigation prop type for the History screen using React Navigation
type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>

type Props = {
  navigation: HistoryScreenNavigationProp
}

// History screen component that displays a list of journal entries
export default function History({ navigation }: Props) {

  const [entries, setEntries] = useState<Entry[]>([])

  // Use useEffect to run once on component mount to fetch entries from DB
  useEffect(() => {

    // Async function to fetch journal entries for the logged-in user
    const fetchEntries = async () => {

      // Get current authenticated user from Supabase auth
      const user = (await supabase.auth.getUser()).data.user

      // Query the 'entries' table filtering by the current user's id Sort the entries by created_at in descending order (newest first)
      const { data } = await supabase
        .from('entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      // Update state with fetched entries
      setEntries(data || [])
    }

    fetchEntries()
  }, [])

   // Render the list of entries using FlatList for performance
  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1 }}>
          <Text style={{ color: 'gray' }}>{dayjs(item.created_at).format('MMM D, YYYY h:mm A')}</Text>
          <Text style={{ fontWeight: 'bold' }}>Mood: {item.sentiment_tag}</Text>
          <Text>{item.entry_text}</Text>
        </View>
      )}
    />
  )
}
