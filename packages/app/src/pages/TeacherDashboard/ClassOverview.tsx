import { IonCard, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { RadioCard } from "@/components/RadioCard";
import "./ClassOverview.scss";

export const ClassOverview: React.FC = () => {
    const intl = useIntl();
    return (
        <div id="teacher-dashboard-class-overview-id">
            {/* header text */}
            <div className="overview-header">
                <IonItem>
                    <IonLabel>
                        <div className="header-overview-first-row">
                            <IonText>
                                1st Grade Spanish
                            </IonText>
                            <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                            <IonText>
                                <strong>
                                    Overview
                                </strong>

                            </IonText>
                            <h1>
                                <strong>
                                    1st Grade Spanish
                                </strong>

                            </h1>
                        </div>


                    </IonLabel>
                </IonItem>

            </div>

            {/*top students cards*/}
            <div className="overview-top-student-cards">

                <IonGrid>
                    <IonRow id=''>
                        <IonCol size-xs='4'>
                            <div className="grid-card">
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
                                            1
                                        </div>
                                    }
                                    title={"Chris Newton"}
                                    content={intl.formatMessage({
                                        id: "teacherDashboard.highestAccuracy",
                                        defaultMessage: "Highest accuracy this week",

                                    })}
                                    iconBackgroundColor="#22BEB9"
                                />
                            </div>
                        </IonCol>

                        <IonCol size-xs='4'>
                            <div className="grid-card">
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
                                            2
                                        </div>
                                    }
                                    title={"Blanche Malone"}
                                    content={intl.formatMessage({
                                        id: "teacherDashboard.mostLearning",
                                        defaultMessage: "Most at-home learning this week",

                                    })}
                                    iconBackgroundColor="#FFE24F"
                                />
                            </div>
                        </IonCol>

                        <IonCol size-xs='4'>
                            <div className="grid-card">
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
                                            3
                                        </div>
                                    }
                                    title={"Eunice Wilkins"}
                                    content={intl.formatMessage({
                                        id: "teacherDashboard.earnedMostStars",
                                        defaultMessage: "Earned the most stars this week",

                                    })}
                                    iconBackgroundColor="#FFAEDC"
                                />
                            </div>
                        </IonCol>

                    </IonRow>
                </IonGrid>

            </div>

            {/* class data */}

            <div className="main-students-data">
                <IonGrid>
                    <IonRow>
                        {/* left card with graph*/}
                        <IonCol>

                            <IonRow>
                                <div className="graph-header">
                                    <h1>
                                        Learning time summary
                                    </h1>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol className="custom-col-class-overview">
                                                <div className="button-wrapper-class-grid">
                                                    <button>
                                                        <p className="text-sm semibold">At school</p>
                                                    </button>
                                                </div>
                                            </IonCol>
                                            <IonCol className="custom-col-class-overview">
                                                <div className="button-wrapper-class-grid">
                                                    <button>
                                                        <p className="text-sm semibold">At home</p>
                                                    </button>
                                                </div>

                                            </IonCol>
                                            <IonCol className="custom-col-class-overview">
                                                <div className="button-wrapper-class-grid">
                                                    <button>
                                                        <p className="text-sm semibold">All learning</p>
                                                    </button>
                                                </div>

                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </div>
                                <div className="graph-body">
                                    <IonGrid>
                                        <IonRow>
                                            {/*game names with percentage */}
                                            <IonCol className="progress-data class-game-name-percentage">
                                                {/* first group */}
                                                <IonRow className="no-padding">
                                                    <IonCol size="1">
                                                        <span className="small-oval-element color-1"></span>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <p className="grid-text-style-small">Communidad</p>
                                                        <p>
                                                            <FormattedMessage
                                                                id="settings.progress.community"
                                                                defaultMessage="Community"
                                                                description="'Community' label for the learning breakdown chart"
                                                            />
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="4">24%</IonCol>
                                                </IonRow>
                                                {/* second group */}

                                                <IonRow>
                                                    <IonCol size="1">
                                                        <span className="small-oval-element color-2"></span>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <p className="grid-text-style-small">Cuentos</p>
                                                        <p>
                                                            <FormattedMessage
                                                                id="settings.progress.stories"
                                                                defaultMessage="Stories"
                                                                description="'Stories' label for the learning breakdown chart"
                                                            />
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="4">26%</IonCol>
                                                </IonRow>
                                                {/* third group */}

                                                <IonRow>
                                                    <IonCol size="1">
                                                        <span className="small-oval-element color-3"></span>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <p className="grid-text-style-small">Bienestar</p>
                                                        <p>
                                                            <FormattedMessage
                                                                id="settings.progress.wellness"
                                                                defaultMessage="Wellness"
                                                                description="'Wellness' label for the learning breakdown chart"
                                                            />
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="4">39%</IonCol>
                                                </IonRow>
                                                {/* fourth group */}

                                                <IonRow>
                                                    <IonCol size="1">
                                                        <span className="small-oval-element color-4"></span>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <p className="grid-text-style-small">Juego</p>
                                                        <p>
                                                            <FormattedMessage
                                                                id="settings.progress.play"
                                                                defaultMessage="Play"
                                                                description="'Play' label for the learning breakdown chart"
                                                            />
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="4">11%</IonCol>
                                                </IonRow>
                                            </IonCol>

                                            {/* graph columnn */}
                                            <IonCol className="class-graph-persentage">

                                            </IonCol >

                                        </IonRow>
                                    </IonGrid>

                                    <div >

                                    </div>
                                </div>

                            </IonRow>
                            {/* blog part */}
                            <IonRow>

                            </IonRow>

                        </IonCol>
                        {/* right card with progress bar*/}
                        <IonCol>

                        </IonCol>
                    </IonRow>
                </IonGrid>

            </div>

        </div>
    )

}