import supabase from './supabaseClient';

export const insertUser = async (userData: {
  username: string;
  qr_code: string;
}) => {
  const {data, error} = await supabase.from('user').insert([userData]);

  if (error) {
    console.error('Error inserting data:', error.message);
    return null;
  }
  return data;
};

// Fetch Users Function
export const fetchUsers = async () => {
  const {data, error} = await supabase.from('users').select('*');

  if (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
  return data;
};

export const logInUser = async (email: string, password: string) => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log('Error Logging In:', error.message);
    return error;
  }
  return data;
};
