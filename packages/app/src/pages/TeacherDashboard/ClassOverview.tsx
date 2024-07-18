import { IonButton, IonCard, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonProgressBar, IonRow, IonText } from "@ionic/react"
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { RadioCard } from "@/components/RadioCard";
import PieChartComponent from "@/components/PieChartComponent/PieChartComponent";
import CommunityIcon from "@/assets/icons/community.svg";
import StoriesIcon from "@/assets/icons/stories.svg";
import WellnessIcon from "@/assets/icons/wellness.svg";
import PlayIcon from "@/assets/icons/play.svg";
import StudentPicture from "@/assets/img/student_picture.png";
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
                            <IonCard>
                            {/* Learning time summary row */}
                            <IonRow>
                                <IonCol>
                                    <div className="graph-header">
                                        <h1>
                                            Learning time summary
                                        </h1>
                                        <IonGrid>
                                            <IonRow className="ion-align-items-center">
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
                                </IonCol>
                            </IonRow>
                            <IonRow>

                                <IonCol size = "6.5" className="class-game-names-persentage">
                                    <IonRow>
                                        {/*game names with percentage */}
                                        <IonCol className="class-game-name-percentage">
                                            {/* first group */}
                                            <IonRow className="no-padding">
                                                <IonCol size="3">
                                                    <span className="small-oval-element color-1">
                                                        <IonIcon icon={StoriesIcon}>

                                                        </IonIcon>
                                                    </span>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <p className="text-md-no-line-height semibold">Cuentos</p>
                                                    
                                                    <p>
                                                        Stories
                                                    </p>
                                                </IonCol>
                                                <IonCol size="3" style={{textAlign: "center",}}>
                                                    <p>
                                                    24%
                                                    </p>
                                                </IonCol>
                                            </IonRow>
                                            {/* second group */}

                                            <IonRow>
                                                <IonCol size="3">
                                                    <span className="small-oval-element color-2">
                                                    <IonIcon icon={WellnessIcon}>

                                                    </IonIcon>
                                                    </span>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <p className="text-md-no-line-height semibold">Bienestar</p>
                                                    <p>
                                                        Wellness
                                                    </p>
                                                </IonCol>
                                                <IonCol size="3" style={{textAlign: "center",}}>
                                                    <p>
                                                    16%
                                                    </p>
                                                </IonCol>
                                            </IonRow>
                                            {/* third group */}

                                            <IonRow>
                                                <IonCol size="3">
                                                    <span className="small-oval-element color-3">
                                                        <IonIcon icon={PlayIcon}>

                                                        </IonIcon>
                                                    </span>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <p className="text-md-no-line-height semibold">Juego</p>
                                                    
                                                    <p>
                                                        Play
                                                    </p>
                                                </IonCol>
                                                <IonCol size="3" style={{textAlign: "center",}}>
                                                    <p>
                                                    28%
                                                    </p>
                                                </IonCol>
                                            </IonRow>
                                            {/* fourth group */}

                                            <IonRow>
                                                <IonCol size="3">
                                                    <span className="small-oval-element color-4">
                                                        <IonIcon icon={CommunityIcon}>

                                                        </IonIcon>
                                                    </span>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <p className="text-md-no-line-height semibold">Communidad</p>
                                                    
                                                    <p>
                                                        Community
                                                    </p>
                                                </IonCol>
                                                <IonCol size="3" style={{textAlign: "center",}}>
                                                    <p>
                                                    32%
                                                    </p>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>

                                    </IonRow>


                                </IonCol>

                                {/* graph columnn */}
                                <IonCol size = "5.5" className="class-graph-persentage">
                                    <PieChartComponent 
                                    data={[24,32,28,16]} 
                                    colors={['#0045A1', '#973D78', '#FF5708', '#22BEB9']} 
                                    innRadius={3} 
                                    width={190} 
                                    height={195}
                                    cX={95}
                                    cY={85}
                                    />
                                </IonCol >


                            </IonRow>

                            </IonCard>
                            {/* blog part */}
                                    <IonCard>
                                       <div className="class-overview-blog-styles">
                                            <IonIcon>

                                            </IonIcon>
                                            <p></p>
                                            <IonButton>
                                                
                                            </IonButton>
                                        </div> 
                                    </IonCard>
                            <IonRow>

                            </IonRow>

                        </IonCol>
                        {/* right card with progress bar*/}
                        <IonCol>
                            <IonCard>
                                <h1>
                                    Needs more support
                                </h1>
                                
                                <IonList lines="full">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <IonItem key={index}>
                                        <div className="student-needs-support-picture">
                                            <img src={StudentPicture} alt="" />
                                        </div>
                                        <div className="student-needs-support-text"></div>
                                        <div className="student-needs-support-progress-bar">
                                            <IonProgressBar 
                                            value={0.25} 
                                            buffer={1}
                                            color="success"
                                            >
                                        
                                            </IonProgressBar>
                                        </div>
                                        </IonItem>
                                    ))}
                                </IonList>
                                    <div className="review-word-styles">

                                    </div>
                                    <IonButton
                                        className="margin-vertical-1"
                                        shape="round"
                                        type="button"
                                        //onClick={}
                                    >
                                        See all students
                                    </IonButton>
                                
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </div>

        </div>
    )

}