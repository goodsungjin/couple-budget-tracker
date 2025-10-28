import { supabase } from '@/shared/lib/supabase/supabase';

export async function getSession() {
  return supabase.auth.getSession();
}

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}
