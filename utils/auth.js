import { supabase } from './supabaseClient';

export async function logIn(user) {
	return await supabase.auth.signIn({ email: user.email, password: user.password });
}
