import { supabase } from './supabaseClient';

export async function logIn(user) {
  console.log(user);
	return await supabase.auth.signIn({ email: user.email, password: user.password });
}
