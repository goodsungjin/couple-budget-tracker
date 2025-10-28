import type { Database } from '@/shared/lib/supabase/database.types';
import { supabase } from '@/shared/lib/supabase/supabase';

type IssuerKind = Database['public']['Enums']['issuer_type_enum'];

export async function listIssuerCatalog(filter?: { issuerType?: IssuerKind }) {
  const q = supabase
    .from('issuer_catalog')
    .select('id, issuer_type, code, display_name, logo_url')
    .order('issuer_type', { ascending: true })
    .order('display_name', { ascending: true });

  if (filter?.issuerType) q.eq('issuer_type', filter.issuerType);

  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}
