import { createClient } from '@supabase/supabase-js'
import { VITE_SUPABASE_KEY, VITE_SUPABASE_URL } from 'src/consts/envs'
import { DomainVote } from 'src/types/supabase'

const supabaseClient = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY)

const SIRCH_DOMAIN_TABLE = 'sirch-domain'
const UNDER_DOMAINS_TABLE = 'under-domains'

export const getSavedDomains = () => supabaseClient.from(SIRCH_DOMAIN_TABLE).select()
export const getSingleDomainByName = (domain: string) =>
  supabaseClient.from(SIRCH_DOMAIN_TABLE).select().eq('domain_name', domain).single()

export const addDomain = async (domain: string) => {
  const { data, error } = await getSingleDomainByName(domain)

  if (error) {
    return await supabaseClient.from(SIRCH_DOMAIN_TABLE)
      .insert([{ domain_name: domain, count: 1 } as DomainVote]).select()
  }

  if (data) {
    return await supabaseClient.from(SIRCH_DOMAIN_TABLE)
      .update([{ domain_name: data.domain_name, count: data.count + 1 } as DomainVote])
      .eq('id', data.id)
      .select()
  }
}

export const getUnderDomainsByDomain = async (domain: string) => {
  const { data, error } = await supabaseClient.from(UNDER_DOMAINS_TABLE).select().eq('domain', domain).select()

  if (error) {
    // no record found
    return []
  }

  if (data) {
    return data.map((d) => d['search-text']) || []
  }

  return []
}
