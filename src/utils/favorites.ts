import { LOCALSTORAGE_FAVORITES } from 'src/consts/local-storage'

export const saveFavorites = (favorites: string[]) => {
  localStorage.setItem(LOCALSTORAGE_FAVORITES, JSON.stringify(favorites))
}

export const getFavorites = () => {
  const storedFavorites = localStorage.getItem(LOCALSTORAGE_FAVORITES) || ''
  try {
    return JSON.parse(storedFavorites) as string[]
  } catch (err) {
    return []
  }
}
