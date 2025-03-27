import supabase from './supabaseClient';

export const insertUser = async (userData: { username: string; qr_code: string }) => {
    const { data, error } = await supabase
      .from("users")
      .insert([userData]);
  
    if (error) {
      console.error("Error inserting data:", error.message);
      return null;
    }
    return data;
  };
  
  // Fetch Users Function
  export const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");
  
    if (error) {
      console.error("Error fetching users:", error.message);
      return [];
    }
    return data;
  };