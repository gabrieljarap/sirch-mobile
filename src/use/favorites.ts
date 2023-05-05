import { ref } from 'vue'
import {
  saveFavorites,
  getFavorites
} from 'src/utils/favorites'

const favorites = ref(getFavorites())

export const useFavorites = () => {
  const isLiked = (url: string) => {
    return favorites.value.includes(url)
  }

  const likeUrl = (url: string) => {
    let res = true
    const favoriteURLSet = new Set(getFavorites())

    if (favoriteURLSet.has(url)) {
      favoriteURLSet.delete(url)
      res = false
    } else {
      favoriteURLSet.add(url)
      res = true
    }

    saveFavorites(Array.from(favoriteURLSet))
    favorites.value = Array.from(favoriteURLSet)
    return res
  }

  return {
    favorites,
    saveFavorites,
    getFavorites,
    isLiked,
    likeUrl
  }
}
