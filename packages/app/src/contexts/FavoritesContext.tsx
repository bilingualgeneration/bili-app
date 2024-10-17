import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface FavoritesState {
  favoriteIds: Set<string>;
  toggleFavoriteId: (favoriteId: string) => void;
}

const FavoritesContext = createContext<FavoritesState>({} as FavoritesState);

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const toggleFavoriteId = (favoriteId: string): void => {
    if (favoriteIds.has(favoriteId)) {
      // toggle off
      favoriteIds.delete(favoriteId);
      setFavoriteIds(new Set(favoriteIds));
    } else {
      // toggle on
      favoriteIds.add(favoriteId);
      setFavoriteIds(new Set(favoriteIds));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavoriteId,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
