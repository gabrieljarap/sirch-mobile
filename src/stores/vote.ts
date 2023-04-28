import { Ref, ref } from 'vue'
import { getSavedDomains } from 'src/utils/supabase'
import { DomainVote } from 'src/types/supabase'

export const useVote = () => {
  const domainVoteMap: Ref<Record<string, number>> = ref({})

  const updateVoteMap = async () => {
    const { data } = await getSavedDomains()

    if (data) {
      for (const record of data as DomainVote[]) {
        domainVoteMap.value[record.domain_name] = record.count
      }
    }
  }

  return {
    domainVoteMap,
    updateVoteMap
  }
}
