import { LOCALSTORAGE_FAVORITES } from 'src/consts/local-storage'

export const useFavorites = () => {
  const saveFavorites = (favorites: string[]) => {
    localStorage.setItem(LOCALSTORAGE_FAVORITES, JSON.stringify(favorites))
  }

  const getFavorites = () => {
    const storedFavorites = localStorage.getItem(LOCALSTORAGE_FAVORITES) || ''
    try {
      return JSON.parse(storedFavorites) as string[]
    } catch (err) {
      return []
    }
  }

  const isLiked = (url: string) => {
    return getFavorites().includes(url)
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
    return res
  }

  return {
    saveFavorites,
    getFavorites,
    isLiked,
    likeUrl
  }
}
