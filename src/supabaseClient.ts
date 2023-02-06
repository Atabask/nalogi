import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://zhmrzpkydamtjtqkndix.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobXJ6cGt5ZGFtdGp0cWtuZGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMzNDAyODAsImV4cCI6MTk4ODkxNjI4MH0.NUZWa1gEelJe7KtU7_ikJUcx8zcYTI4uaGJnltbBkO0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase