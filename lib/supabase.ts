import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jzxjbfflqwqghbcdpkhy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eGpiZmZscXdxZ2hiY2Rwa2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyOTQ1MzIsImV4cCI6MjA2ODg3MDUzMn0.t-PJXtJKJ5261veGMoRtzmircoDaV-SLW5cH2IItggg'

// Create a Supabase client instance using project's URL and public (anon) key
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
