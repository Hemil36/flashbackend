import supabase from '../config/db.js';

export const createUser = async (username, email, passwordHash) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password_hash: passwordHash }]).select();

    if (error) {
      console.error('Error creating user:', error);
      throw error;  // Ensure that the error is thrown and caught properly.
    }

    return data;  // Only return data if there's no error.
  } catch (error) {
    console.error('Unhandled error:', error);
    throw error;  // Re-throw the error to be caught by the caller.
  }
};


export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error) throw error;
  return data;
};
