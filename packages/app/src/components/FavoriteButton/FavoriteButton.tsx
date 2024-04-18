import { IonButton, IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { useFavorites } from "@/contexts/FavoritesContext";

import "./FavoriteButton.scss";

export const FavoriteButton: React.FC<{
  color?: string;
  fid: string;
}> = ({ color = "#ffffff", fid }) => {
  const { favoriteIds, toggleFavoriteId } = useFavorites();
  return (
    <IonButton
      className="favorite-button"
      style={{ color: color }}
      fill="clear"
      onClick={(event) => {
        toggleFavoriteId(fid);
        event.stopPropagation();
      }}
    >
      <IonIcon
        slot="icon-only"
        icon={favoriteIds?.has(fid) ? heart : heartOutline}
      />
    </IonButton>
  );
};
