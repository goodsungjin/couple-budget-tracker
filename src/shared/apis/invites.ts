import type { Database } from '@/shared/lib/supabase/database.types';
import { supabase } from '@/shared/lib/supabase/supabase';

type MemberRole = Database['public']['Enums']['member_role'];

export async function findUserByEmailExact(email: string) {
  const { data, error } = await supabase.rpc('find_user_by_email_exact', {
    p_email: email,
  });
  if (error) throw error;
  return (data ?? [])[0] ?? null;
}

export async function getInviteStatus(ledgerId: string, userId: string) {
  const { data, error } = await supabase.rpc('invite_status', {
    p_ledger_id: ledgerId,
    p_user_id: userId,
  });
  if (error) throw error;
  return data;
}

export async function createInviteByUserId(
  ledgerId: string,
  inviteeUserId: string,
  role: MemberRole = 'editor'
) {
  const { data, error } = await supabase.rpc(
    'create_ledger_invite_by_user_id',
    {
      p_ledger_id: ledgerId,
      p_invitee_user_id: inviteeUserId,
      p_role: role,
    }
  );
  if (error) throw error;
  return data;
}

export async function listMyPendingInvites() {
  const { data, error } = await supabase.rpc('my_pending_invites');
  if (error) throw error;
  return data ?? [];
}

export async function acceptInviteById(inviteId: string) {
  const { data, error } = await supabase.rpc('accept_ledger_invite_by_id', {
    p_invite_id: inviteId,
  });
  if (error) throw error;
  return data;
}

export async function acceptInviteForLedger(ledgerId: string) {
  const { data, error } = await supabase.rpc(
    'accept_ledger_invite_for_ledger',
    {
      p_ledger_id: ledgerId,
    }
  );
  if (error) throw error;
  return data;
}
