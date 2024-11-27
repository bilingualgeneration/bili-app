/*
  todo: prevent cards below top card from being swipeable
  can use pointer-events: none to do that
  however react-springs not getting this css styling
*/

const MAX_CARDS_SHOWN = 3;

import { AudioButton } from "@/components/AudioButton";
import { CloseButton } from "@/components/CloseButton";
import React, { FC, useEffect, useState } from "react";
import { AudioManager, useAudioManager } from "@/contexts/AudioManagerContext";
import {
  SpringValue,
  useSprings,
  animated,
  to as interpolate,
} from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useProfile } from "@/hooks/Profile";

import LightbulbIcon from "@/assets/icons/lightbulb.svg";
import styles from "./Deck.module.css";
import { I18nMessage } from "../I18nMessage";
import { useLanguage } from "@/hooks/Language";

interface CardAudio {
  url: string;
}

interface DeckProps {
  cards: {
    esAudio?: CardAudio | null;
    esHintAudio?: CardAudio | null;
    esHintText?: string;
    esText?: string;
    enAudio?: CardAudio | null;
    enHintAudio?: CardAudio | null;
    enHintText?: string;
    enText?: string;
    esIncAudio?: CardAudio | null;
    esIncHintAudio?: CardAudio | null;
    esIncHintText?: string;
    esIncText?: string;
  }[];
  id: string;
}

export const Deck: FC<DeckProps> = ({ id, cards }) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio } = useAudioManager();
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguage();
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0); // Track current card index
  const currentCard = cards[currentCardIndex];
  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };
  useEffect(() => {
    setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearAudio();
    };
  }, []);

  const [props, api] = useSprings(cards.length, (j) => {
    const i = Math.min(j, MAX_CARDS_SHOWN);
    return {
      x: -2 - i * 5, // Initialize x position of each card
      y: 10 - i * 10, // Initialize y position of each card
      scale: 1, // Initialize scale of each card
      rot: 0, // Initialize rotation angle of each card
      zIndex: cards.length - j, // Initialize zIndex of each card
      delay: i * 100, // Delay before starting the animation
    };
  });

  const newCount = (currentCardIndex + 1) % cards.length;

  // Binding useDrag() hook to each card using bind function
  const bind = useDrag(
    // Callback function triggered when a drag event occurs
    ({
      args: [swiped_card_index], // Index of the dragged card
      down, // Flag indicating if the card is being dragged
      movement: [mx], // Movement along the x-axis
      direction: [xDir], // Direction of movement
    }) => {
      const dir = xDir < 0 ? -1 : 1;
      if (!down && mx < -20) {
        // If the drag ends and the horizontal movement exceeds the threshold
        // Animate the swiped card and shift other cards forward
        setTimeout(() => {
          api.start((i) => {
            if (i === swiped_card_index) {
              return {
                x: -2 - Math.min(cards.length - 1, MAX_CARDS_SHOWN) * 5,
                y: 10 - Math.min(cards.length - 1, MAX_CARDS_SHOWN) * 10,
                scale: 1,
                rot: 0,
                zIndex: 0,
                delay: 0,
              };
            } else {
              const d =
                (i - (swiped_card_index + 1) + cards.length) % cards.length;
              const distance = Math.min(MAX_CARDS_SHOWN, d); // calculates the distance between the current card (i) and the swiped card (index)
              return {
                x: -2 - distance * 5,
                y: 10 - distance * 10,
                scale: 1,
                rot: 0,
                zIndex: cards.length - d - 1,
                delay: distance * 100,
              };
            }
          });
          clearAudio();
          const newCount = (currentCardIndex + 1) % cards.length;
          setCurrentCardIndex(newCount);
        }, 500);
        return;
      }

      // Logic for animating the card while it's being dragged
      api.start((i) => {
        if (swiped_card_index !== i) {
          return; // This allows for swipe to be limited to one card at a time vs all cards together
        }

        // Limit the maximum distance dragged to the left
        const maxLeftDistance = -150;
        const constrainedX = down ? Math.min(0, mx) : 0;
        const x = Math.max(maxLeftDistance, constrainedX);

        // Calculate the tilt angle based on the ratio of the current distance to the maximum distance
        const maxRotation = -20;
        const tiltAngle = (x / maxLeftDistance) * maxRotation;

        const scale = down ? 1.1 : 1; // Increase scale when card is being dragged
        return {
          x,
          rot: tiltAngle,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : 500 }, // Adjust animation configuration based on drag state
        };
      });
    },
  );

  return (
    <>
      <div className="padding-top-5 ion-hide-lg-down"></div>
      <IonGrid className="no-border-box community-grid-main ion-no-padding">
        <IonRow class="ion-align-items-center">
          <IonCol className="no-border-box" size="3" sizeMd="4">
            {/* Header */}
            <div className="margin-top-4">
              <IonText className="align-center ">
                <h1 className="text-3xl semibold margin-top-1">
                  <I18nMessage id={id} />
                </h1>
                <I18nMessage
                  id={id}
                  level={2}
                  wrapper={(text: string) => (
                    <p className="text-2xl color-english">{text}</p>
                  )}
                />
              </IonText>
            </div>
            {/* Audio button */}
            <div className="sound-button">
              <AudioButton
                audio={{
                  es: currentCard?.esAudio?.url || "",
                  en: currentCard?.enAudio?.url || "",
                }}
                size={isMobile ? "small" : "large"}
              />
            </div>
          </IonCol>
          <IonCol
            className={`no-border-box ${isMobile ? "padding-right-1" : ""}`}
          >
            {/* Cards */}
            <div className={`${styles.container} no-border-box`}>
              {props.map(({ x, y, rot, scale, zIndex }, i) => {
                const card = cards[i % cards.length];
                const {
                  esText,
                  esAudio,
                  esIncText,
                  esIncAudio,
                  enText,
                  enAudio,
                } = card;
                const content = (
                  <>
                    <h1 className={"text-2xl semibold"}>
                      {language === "en" ? enText : esText}
                    </h1>
                    <IonGrid style={{ width: "100%" }}>
                      <IonRow>
                        <IonCol size="9">
                          {(language === "es.en" || language === "en.es") && (
                            <p className="text-lg color-english">{enText}</p>
                          )}
                        </IonCol>
                        <IonCol
                          className="ion-text-center"
                          size="3"
                          style={{
                            position: "absolute",
                            bottom: "16px",
                            right: "0px",
                            zIndex: 10,
                          }}
                        >
                          {currentCard.esHintText && (
                            <>
                              <IonButton
                                className="uva curved-corners"
                                onClick={() => {
                                  setIsHintOpen(true);
                                }}
                              >
                                <IonIcon
                                  slot="icon-only"
                                  icon={LightbulbIcon}
                                />
                              </IonButton>
                              <IonText>
                                <h2 className="text-lg semibold">
                                  <I18nMessage id="common.hint" />
                                </h2>
                                <I18nMessage
                                  id="common.hint"
                                  level={2}
                                  wrapper={(text: string) => (
                                    <h3 className="text-md color-english">
                                      {text}
                                    </h3>
                                  )}
                                />
                              </IonText>
                            </>
                          )}
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </>
                );
                return (
                  <animated.div
                    {...bind(i)}
                    key={i}
                    className={`${styles.card} no-border-box`}
                    style={{
                      backgroundColor: colors[i % colors.length],
                      x,
                      y,
                      zIndex,
                      pointerEvents: i === currentCardIndex ? "auto" : "none",
                      transform: interpolate(
                        [rot, x],
                        (rot, x) => `translateX(${x}px) rotate(${rot}deg)`,
                      ),
                    }}
                  >
                    <div className={`${styles.card_content} no-border-box`}>
                      {content}
                    </div>
                  </animated.div>
                );
              })}
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Modal component */}
      <IonModal
        className="modal"
        isOpen={isHintOpen}
        onWillDismiss={() => {
          clearAudio();
          setIsHintOpen(false);
        }}
      >
        <div className="ion-padding modal-content">
          <div style={{ position: "absolute", right: "1rem", zIndex: 999 }}>
            <CloseButton
              onClick={() => {
                setIsHintOpen(false);
              }}
            />
          </div>
          <div className="margin-top-2">
            <Hint {...currentCard} />
          </div>
        </div>
      </IonModal>
    </>
  );
};
//  Hint component
const Hint: React.FC<any> = ({
  esHintAudio,
  esHintText,
  esIncHintAudio,
  esIncHintText,
  enHintAudio,
  enHintText,
}) => {
  const { language } = useLanguageToggle();
  const {
    profile: { isInclusive },
  } = useProfile();
  return (
    <IonGrid>
      <IonRow>
        <IonCol className="ion-text-right padding-right-1" size="2">
          <IonButton className="uva curved-corners elevate">
            <IonIcon slot="icon-only" icon={LightbulbIcon} />
          </IonButton>
        </IonCol>
        <IonCol size="10">
          <IonText>
            <h2 className="text-4xl semibold">
              <I18nMessage id="common.hint" />
            </h2>
            <I18nMessage
              id="common.hint"
              level={2}
              wrapper={(text: string) => (
                <h3 className="text-3xl color-english">{text}</h3>
              )}
            />
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow className="margin-top-1">
        <IonCol className="ion-text-right padding-right-1" size="2">
          <AudioButton
            audio={{
              en: enHintAudio.url,
              es: esHintAudio.url,
            }}
            className="elevate"
            size="small"
          />
        </IonCol>
        <IonCol size="10">
          <IonText>
            <h2 className="text-2xl color-suelo">
              {language === "en" ? enHintText : esHintText}
            </h2>
          </IonText>
          {(language === "es.en" || language === "en.es") && (
            <IonText>
              <h2 className="text-xl color-english">{enHintText}</h2>
            </IonText>
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
