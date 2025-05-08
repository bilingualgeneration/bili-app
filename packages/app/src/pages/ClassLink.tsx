import { IonButton, IonCard, IonCardContent } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useProfile } from "@/hooks/Profile";
import { getClasses } from "@/lib/directus";

import loginWithClassLink from "@/assets/img/login_with_classlink.png";

export const ClassLink: React.FC = () => {
  const { isLoggedIn, logout, profile } = useProfile();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<any[]>([]);
  const internalGetClasses = useCallback(() => {
    setIsLoading(true);
    getClasses().then((response: any) => {
      setIsLoading(false);
      setClasses(response.classes);
    });
  }, [getClasses, setIsLoading, setClasses]);
  console.log(classes);
  return (
    <>
      <div className="content-wrapper">
        <div style={{ maxWidth: "40rem", margin: "auto" }}>
          <IonCard>
            <IonCardContent className="ion-text-center">
              {isLoggedIn && (
                <IonButton color="danger" onClick={logout}>
                  Log Out
                </IonButton>
              )}
              {!isLoggedIn && (
                <a href="http://localhost:8055/auth/login/classlink?redirect=http://localhost:5173/classlink">
                  <img src={loginWithClassLink} />
                </a>
              )}
            </IonCardContent>
          </IonCard>
          {isLoggedIn && (
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h1>
                  {profile.first_name} {profile.last_name}
                </h1>
                <IonButton onClick={internalGetClasses} disabled={isLoading}>
                  Get Classes
                </IonButton>
                {classes.map((c) => {
                  return (
                    <div key={c.sourcedId}>
                      <h1>{c.title}</h1>
                      <p>Grades {c.grades.join(", ")}</p>
                    </div>
                  );
                })}
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </div>
    </>
  );
};
