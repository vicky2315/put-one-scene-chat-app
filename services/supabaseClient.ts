import {createClient} from '@supabase/supabase-js';
import {SUPABASE_ANON_PUBLIC_KEY, SUPABASE_URL} from '@env';
import 'react-native-url-polyfill/auto';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC_KEY!);

export default supabase;
