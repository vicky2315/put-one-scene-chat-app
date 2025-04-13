import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUPABASE_ANON_PUBLIC_KEY, SUPABASE_URL} from '@env';
import 'react-native-url-polyfill/auto';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC_KEY!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // needed for mobile
  },
});

export default supabase;
