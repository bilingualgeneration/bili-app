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
import { addOutline, ellipse, sparkles, } from "ionicons/icons";
import { Carousel } from "@/components/Carousel";
import { SettingsExploreCard } from "@/components/Settings/SettingsExplore";
import settingsCardDesign1 from "@/assets/icons/settings_explore_card_bg1.svg";
import settingsCardDesign2 from "@/assets/icons/settings_explore_card_bg2.svg";
import settingsCardDesign3 from "@/assets/icons/settings_explore_card_bg3.svg";
import ClassroomAvatar from "@/assets/icons/classroom_avatar.svg"
import { FormattedMessage, useIntl } from "react-intl";
import { Preferences } from "@capacitor/preferences";
import React from "react";

import { useProfile } from "@/hooks/Profile";

import "./MyClassrooms.scss";
import { RadioCard } from "@/components/RadioCard";
import { Link } from "react-router-dom";

const gradesLookup: {[i: string]: string} = {
  'p': 'Pre-K',
  'k': 'Kindergarten',
  '1': '1st Grade',
  '2': '2nd Grade',
  '3': '3rd Grade',
  '4': '4th Grade',
  '5': '5th Grade',
}

const getGrades = (grades: string[]) => {
  return grades.map(
    (g: string) => gradesLookup[g]
  ).join(', ');
};

export const MyClassrooms: React.FC = () => {
  const {
    profile: { isImmersive, isInclusive },
    classrooms: classrooms
  } = useProfile();
  
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

                    {Object.keys(classrooms).length > 0 && (
                        <IonRow className="ion-justify-content-between" id='classroom_name_wrapper'>
                            {Object.values(classrooms).map((classroom: any, index) => (
                                <IonCol size="6" key={classroom.id}>
                                    <div className="classroom-names">
                                        <RadioCard
                                            icon={
                                                <img src={ClassroomAvatar} />
                                            }
                                          title={classroom.name}
                                            subTitle={getGrades(classroom.grades)}
                              content={intl.formatMessage(
				{id: 'pages.classrooms.classroomSize'},{size: classroom.size}
			      )}
                                            iconBackgroundColor=""
                                            titleFontSize="xl"
                                            titleColor="color-suelo"
                                            contentFontSize="lg"
                                            contentColor="color-barro"
                                        />
                                    </div>
                                </IonCol>
                            ))}
                        </IonRow>
                    )}

                    <IonRow
                        className="ion-justify-content-between margin-bottom-3 add-new-class-row ion-align-items-center"
                    >
                        <IonCol>
                            <IonText className="text-xl semibold">
                                Add a new classroom
                            </IonText>
                        </IonCol>
                        <IonCol size="0.75">
                            <Link to="/classrooms/add">
                                <button className="add-class-button">
                                    <IonIcon size="large" color="light" icon={addOutline}>
                                    </IonIcon>
                                </button>
                            </Link>
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
