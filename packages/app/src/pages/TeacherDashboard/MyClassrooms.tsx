import { useEffect, useState } from "react";
import {
    IonButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonPopover,
    IonContent,
    IonText,
} from "@ionic/react";
import Joyride from "react-joyride";
import { addOutline, ellipse, sparkles, } from "ionicons/icons";
import { Carousel } from "@/components/Carousel";
import { SettingsExploreCard } from "@/components/Settings/SettingsExplore";
import settingsCardDesign1 from "@/assets/icons/settings_explore_card_bg1.svg";
import settingsCardDesign2 from "@/assets/icons/settings_explore_card_bg2.svg";
import settingsCardDesign3 from "@/assets/icons/settings_explore_card_bg3.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { Preferences } from "@capacitor/preferences";
import { useAdultCheck } from "@/contexts/AdultCheckContext";
import React from "react";

import { useProfile } from "@/hooks/Profile";

import "./MyClassrooms.scss";
import { RadioCard } from "@/components/RadioCard";

export const MyClassrooms: React.FC = () => {

    const { profile: { isImmersive, isInclusive } } = useProfile();
    const [shouldShowTutorial, setShouldShowTutorial] = useState<boolean>(false);
    //const { childProfiles, activeChildProfile, setActiveChildProfile } = useChildProfile();
    const { isAdultCheckOpen } = useAdultCheck();

    useEffect(() => {
        if (!isAdultCheckOpen) {
            Preferences.get({
                key: "shouldShowSettingsTutorial",
            }).then((response) => {
                if (response.value === null) {
                    // have never seen it before
                    setShouldShowTutorial(true);
                    /*
                        Preferences.set({
                          key: "shouldShowSettingsTutorial",
                          value: false,
                        });
                    */
                }
            });
        }
    }, [isAdultCheckOpen]);

    const steps = [
        {
            target: "#side-menu-button-sideMenu-profile",
            disableBeacon: true,
            content: (
                <FormattedMessage
                    id="settings.onboarding.profile"
                    defaultMessage="Language learning is for the whole family! You can add up to five child profiles on the overview page or by clicking 'Profiles.'"
                    description="Onboarding message for the Profiles button on the side menu"
                />
            ),
        },
        {
            target: "#inclusive-spanish-card",
            disableBeacon: true,
            content: (
                <FormattedMessage
                    id="settings.onboarding.inclusiveSpanish"
                    defaultMessage="Did you know you can choose inclusive Spanish on Bili? Opt for terms like 'amigues,' 'niñes,' and 'Latine' to personalize your experience when referring to groups or non-binary characters."
                    description="Onboarding message for the Profiles button on the side menu"
                />
            ),
        },
        {
            target: "#side-menu-button-sideMenu-preferences",
            disableBeacon: true,
            content: (
                <FormattedMessage
                    id="settings.onboarding.preferences"
                    defaultMessage="Click on 'Preferences' to change your language settings to and manage other preferences like playtime limits."
                    description="Onboarding message for the Preferences button on the side menu"
                />
            ),
        },
        {
            target: "#side-menu-button-sideMenu-progress",
            disableBeacon: true,
            content: (
                <FormattedMessage
                    id="settings.onboarding.progress"
                    defaultMessage="Learn more about your child's language learning by checking out the 'Progress' section. Use this section to gain insights into your child's activity, including how much time they've spend in each category and their favorite Bili activities."
                    description="Onboarding message for the Progress button on the side menu"
                />
            ),
        },
    ];

    const translations = {
        Joyride: {
            back: (
                <FormattedMessage
                    id="settings.overview.joyrideBack"
                    defaultMessage="Back"
                    description="Button to go 'back' in the walkthrough tutorial on settings/overview page"
                />
            ),
            last: (
                <FormattedMessage
                    id="settings.overview.joyrideLast"
                    defaultMessage="Last"
                    description="Appears when user is on 'last' slide of the walkthrough tutorial on settings/overview page"
                />
            ),
            next: (
                <FormattedMessage
                    id="settings.overview.joyrideNext"
                    defaultMessage="Next"
                    description="Button to go to 'next' section of the walkthrough tutorial on settings/overview page"
                />
            ),
            skip: (
                <FormattedMessage
                    id="settings.overview.joyrideSkip"
                    defaultMessage="Skip"
                    description="Button to 'skip' the walkthrough tutorial on settings/overview page"
                />
            ),
        },
    };

    const intl = useIntl();


    const settingsExploreCards = [
        {
            backgroundImage: settingsCardDesign1,
            backgroundColor: "#973D78",
            title: intl.formatMessage({
                id: "settings.overview.gettingStartedTitle",
                defaultMessage: "Getting started",
                description: "Explore card #1 title",
            }),
            subtitle: intl.formatMessage({
                id: "settings.overview.gettingStartedContent",
                defaultMessage:
                    "Your Essential Guide to Getting Started with the Bili App.",
                description: "Explore card #1 content",
            }),
            tags: [
                {
                    color: "#FFAEDC",
                    text: intl.formatMessage({
                        id: "tag.guide",
                        defaultMessage: "Guide",
                        description: "Content tag for guides",
                    }),
                },
                {
                    color: "#F1D100",
                    text: intl.formatMessage({
                        id: "tag.resources",
                        defaultMessage: "Resources",
                        description: "Content tag for resources",
                    }),
                },
            ],
        },
        {
            backgroundImage: settingsCardDesign2,
            backgroundColor: "#22BEB9",
            title: intl.formatMessage({
                id: "settings.overview.inclusiveSpanishTitle",
                defaultMessage: "Inclusive Spanish",
                description: "Explore card #2 title",
            }),
            subtitle: intl.formatMessage({
                id: "settings.overview.InclusiveSpanishContent",
                defaultMessage:
                    "Learn about what Inclusive Spanish is and why it exists.",
                description: "Explore card #2 content",
            }),
            tags: [
                {
                    color: "#D3EAE8",
                    text: intl.formatMessage({
                        id: "tags.social_justice",
                        defaultMessage: "Social Justice",
                        description: "Content tag for social justice",
                    }),
                },
                {
                    color: "#F1D100",
                    text: intl.formatMessage({
                        id: "tag.resources",
                        defaultMessage: "Resources",
                        description: "Content tag for resources",
                    }),
                },
            ],
        },
        {
            backgroundImage: settingsCardDesign3,
            backgroundColor: "#FFB68F",
            title: intl.formatMessage({
                id: "settings.overview.getChildTitle",
                defaultMessage: "Get your child speaking Spanish with Bili",
                description: "Explore card #3 title",
            }),
            subtitle: intl.formatMessage({
                id: "settings.overview.getChildContent",
                defaultMessage:
                    "Explore special features that promote authentic language production.",
                description: "Explore card #3 content",
            }),
            tags: [
                {
                    color: "#973D78",
                    text: intl.formatMessage({
                        id: "tags.parents",
                        defaultMessage: "Parents",
                        description: "Content tag for parents",
                    }),
                    textColor: "#fff",
                },
                {
                    color: "#F1D100",
                    text: intl.formatMessage({
                        id: "tag.resources",
                        defaultMessage: "Resources",
                        description: "Content tag for resources",
                    }),
                },
            ],
        },
        {
            backgroundImage: settingsCardDesign2,
            backgroundColor: "#22BEB9",
            title: intl.formatMessage({
                id: "settings.overview.inclusiveSpanishTitle",
                defaultMessage: "Inclusive Spanish",
                description: "Explore card #2 title",
            }),
            subtitle: intl.formatMessage({
                id: "settings.overview.InclusiveSpanishContent",
                defaultMessage:
                    "Learn about what Inclusive Spanish is and why it exists.",
                description: "Explore card #2 content",
            }),
            tags: [
                {
                    color: "#D3EAE8",
                    text: intl.formatMessage({
                        id: "tags.social_justice",
                        defaultMessage: "Social Justice",
                        description: "Content tag for social justice",
                    }),
                },
                {
                    color: "#F1D100",
                    text: intl.formatMessage({
                        id: "tag.resources",
                        defaultMessage: "Resources",
                        description: "Content tag for resources",
                    }),
                },
            ],
        },
        {
            backgroundImage: settingsCardDesign2,
            backgroundColor: "#22BEB9",
            title: intl.formatMessage({
                id: "settings.overview.inclusiveSpanishTitle",
                defaultMessage: "Inclusive Spanish",
                description: "Explore card #2 title",
            }),
            subtitle: intl.formatMessage({
                id: "settings.overview.InclusiveSpanishContent",
                defaultMessage:
                    "Learn about what Inclusive Spanish is and why it exists.",
                description: "Explore card #2 content",
            }),
            tags: [
                {
                    color: "#D3EAE8",
                    text: intl.formatMessage({
                        id: "tags.social_justice",
                        defaultMessage: "Social Justice",
                        description: "Content tag for social justice",
                    }),
                },
                {
                    color: "#F1D100",
                    text: intl.formatMessage({
                        id: "tag.resources",
                        defaultMessage: "Resources",
                        description: "Content tag for resources",
                    }),
                },
            ],
        },
    ];

    return (
        <div id="add-my-classrooms-id">
            {shouldShowTutorial && !isAdultCheckOpen && false && (
                <Joyride
                    locale={translations.Joyride}
                    hideCloseButton
                    showSkipButton
                    showProgress
                    steps={steps}
                    continuous={true}
                    styles={{
                        tooltipContainer: {
                            textAlign: "left",
                        },
                    }}
                />
            )}
            <div className="settings-pg1-container">
                <IonGrid class="adult-profile-content">
                    <IonRow class="ion-justify-content-between row">
                        <IonCol size="auto">
                            <IonText className="text-3xl semibold child-profile-heading margin-bottom-1-5">
                                My Classrooms
                            </IonText>
                        </IonCol>
                        <IonCol size="auto">
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-between">
                        <IonCol size="5.75">
                            <div className="classroom-names">
                                <RadioCard
                                    icon={
                                        <div
                                            style={{
                                                color: "#000",
                                                textAlign: "center",
                                                fontFamily: "Outfit",
                                                fontSize: "36px",
                                                fontStyle: "normal",
                                                fontWeight: "600",
                                                lineHeight: "800",
                                                letterSpacing: "0.2px",
                                            }}
                                        >
                                            BM
                                        </div>
                                    }
                                    title={"Blanche Malone Class"}
                                    subTitle={"3rd Grade"}
                                    content={"19 students"}
                                    iconBackgroundColor="#FFDBCA"
                                    titleFontSize="xl"
                                    titleColor="color-suelo"
                                    contentFontSize="lg"
                                    contentColor="color-barro"
                                />
                            </div>
                        </IonCol>

                        <IonCol size="5.75">
                            <div className="classroom-names">
                                <RadioCard
                                    icon={
                                        <div
                                            style={{
                                                color: "#000",
                                                textAlign: "center",
                                                fontFamily: "Outfit",
                                                fontSize: "36px",
                                                fontStyle: "normal",
                                                fontWeight: "800",
                                                lineHeight: "800",
                                                letterSpacing: "0.2px",
                                            }}
                                        >
                                            SL
                                        </div>
                                    }
                                    title={"Sra. Lynch’s Clase "}
                                    subTitle={"1st Grade & 2nd Grade"}
                                    content={"19 students"}
                                    iconBackgroundColor="#FFD8EB"
                                    titleFontSize="xl"
                                    titleColor="color-suelo"
                                    contentFontSize="lg"
                                    contentColor="color-barro"
                                />
                            </div>
                        </IonCol>
                    </IonRow>

                    <IonRow
                        className="ion-justify-content-between margin-bottom-3 add-new-class-row ion-align-items-center"
                    >
                        <IonCol>
                            <IonText className="text-xl semibold">
                                Add a new classroom
                            </IonText>
                        </IonCol>
                        <IonCol size="0.75">
                            <button className="add-class-button">
                                <IonIcon size="large" color="light" icon={addOutline}>
                                </IonIcon>
                            </button>

                        </IonCol>
                    </IonRow>

                    <IonRow class="ion-align-items-end ion-justify-content-between row margin-bottom-1-5">
                        <IonCol size="11.2">
                            <div className="explore-bili-heading-subheading-container">
                                <IonText className="text-3xl semibold explore-bili-heading">
                                    Implementation guides
                                </IonText>
                                <p className="text-md color-barro margin-bottom-1-5">
                                    Carousel section description to explain about the content.
                                </p>
                            </div>
                        </IonCol>
                        <IonCol>
                            <IonText>

                            </IonText>
                            <p className="margin-bottom-1-5">
                                <a href="https://thebiliapp.com/blog/" className="text-md color-barro no-underline" target="_blank" rel="noopener noreferrer">
                                    See all (9)
                                </a>
                            </p>
                        </IonCol>
                    </IonRow>

                    <div className="child-profile-content margin-top-1">
                        <Carousel height={350}>
                            {settingsExploreCards.map((card, index) => (
                                <SettingsExploreCard
                                    {...card}
                                    key={index}
                                />
                            ))}
                        </Carousel>
                    </div>
                </IonGrid>
            </div>
        </div>
    );

}