import { IonButton, IonCard, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonProgressBar, IonRow, IonText } from "@ionic/react"
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { RadioCard } from "@/components/RadioCard";
import PieChartComponent from "@/components/PieChartComponent/PieChartComponent";
import CommunityIcon from "@/assets/icons/community.svg";
import StoriesIcon from "@/assets/icons/stories.svg";
import WellnessIcon from "@/assets/icons/wellness.svg";
import DropIcon from "@/assets/icons/drop.svg";
import HouseIcon from "@/assets/icons/house.svg";
import PresentIcon from "@/assets/icons/present.svg";
import PlayIcon from "@/assets/icons/play.svg";
import LightBulb from "@/assets/icons/lightbulb.svg";
import StudentPicture from "@/assets/img/student_picture.png";
import StudentsReadingPicture from "@/assets/img/kids_reading.png";
import "./ClassOverview.scss";
import { useState } from "react";
import { Link } from "react-router-dom";


const studentData = [
    {
        name: "Michel Jourdan",
        exercise: "Word family",
        percentage: 0.32,
        image: StudentPicture,
    },
    {
        name: "John Doe",
        exercise: "Math exercises",
        percentage: 0.45,
        image: StudentPicture,
    },
    {
        name: "Jane Smith",
        exercise: "Reading test",
        percentage: 0.75,
        image: StudentPicture,
    },
    {
        name: "Alice Johnson",
        exercise: "Grammar test",
        percentage: 0.58,
        image: StudentPicture,
    },
    {
        name: "Bob Brown",
        exercise: "Science quiz",
        percentage: 0.85,
        image: StudentPicture,
    },
];

const dataAtSchool = [24, 32, 28, 16];
const dataAtHome = [18, 25, 40, 17];
const dataAllLearning = dataAtSchool.map((value, index) => value + dataAtHome[index]);

export const ClassOverview: React.FC = () => {

    const intl = useIntl();
    const [selectedCategory, setSelectedCategory] = useState<string>("school");

    const handleButtonClick = (category: string) => {
        setSelectedCategory(category);
    };

    const getButtonClass = (buttonName: string) => {
        return selectedCategory === buttonName ? "active-button-green" : "";
    };

    let data;
    switch (selectedCategory) {
        case "home":
            data = dataAtHome;
            break;

        case "all":
            data = dataAllLearning;
            break;

        case "school":
        default:
            data = dataAtSchool;

    }

    console.log(data, "DATA")
    return (
        <div id="teacher-dashboard-class-overview-id">
            {/* header text */}
            <div className="overview-header">
                <IonItem>
                    <IonLabel>
                        <div className="header-overview-row">
                            <div className="header-overview-arrow">
                                <IonText className="text-sm color-barro classroom-name-text">
                                    1st Grade Spanish
                                </IonText>
                                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                                <IonText className="text-sm semibold overview-text-header">
                                    Overview
                                </IonText>
                            </div>
                            <div className="classroom-name-block">
                                <IonText className="text-3xl semibold">
                                    1st Grade Spanish
                                </IonText>
                                <button className="visit-students-button">
                                    <Link to="/student" className="no-underline">
                                        <p className="text-md semibold color-suelo">
                                            Go to student app
                                        </p>
                                    </Link>
                                </button>

                            </div>

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
                                            <IonIcon icon={DropIcon}></IonIcon>
                                        </div>
                                    }
                                    title={"Chris Newton"}
                                    content={intl.formatMessage({
                                        id: "teacherDashboard.highestAccuracy",
                                        defaultMessage: "Highest accuracy this week",

                                    })}
                                    iconBackgroundColor="#D3EAE8"
                                    titleFontSize="xl"
                                    titleColor="color-suelo"
                                    contentFontSize="sm"
                                    contentColor="color-barro"
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
                                            <IonIcon icon={HouseIcon}></IonIcon>
                                        </div>
                                    }
                                    title={"Blanche Malone"}
                                    content={intl.formatMessage({
                                        id: "teacherDashboard.mostLearning",
                                        defaultMessage: "Most at-home learning this week",

                                    })}
                                    iconBackgroundColor="#FFDBCA"
                                    titleFontSize="xl"
                                    titleColor="color-suelo"
                                    contentFontSize="sm"
                                    contentColor="color-barro"
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
                                            <IonIcon icon={PresentIcon}></IonIcon>
                                        </div>
                                    }
                                    title={"Eunice Wilkins"}
                                    content={intl.formatMessage({
                                        id: "teacherDashboard.earnedMostStars",
                                        defaultMessage: "Earned the most stars this week",

                                    })}
                                    iconBackgroundColor="#FFD8EB"
                                    titleFontSize="xl"
                                    titleColor="color-suelo"
                                    contentFontSize="sm"
                                    contentColor="color-barro"
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
                                            <IonText className="text-xl semibold color-suelo">
                                                Learning time summary
                                            </IonText>


                                            <IonGrid className="table-green-buttons">
                                                <IonRow className="ion-align-items-center">
                                                    <IonCol
                                                        className={`custom-col-class-overview first-column ${getButtonClass("school")}`}
                                                    >
                                                        <div className="button-wrapper-class-grid">
                                                            <button
                                                                onClick={() => handleButtonClick("school")}
                                                            >
                                                                <p className="text-sm semibold">At school</p>
                                                            </button>
                                                        </div>
                                                    </IonCol>
                                                    <IonCol
                                                        className={`custom-col-class-overview ${getButtonClass("home")}`}
                                                    >
                                                        <div className="button-wrapper-class-grid">
                                                            <button
                                                                onClick={() => handleButtonClick("home")}
                                                            >
                                                                <p className="text-sm semibold">At home</p>
                                                            </button>
                                                        </div>

                                                    </IonCol>
                                                    <IonCol
                                                        className={`custom-col-class-overview last-column ${getButtonClass("all")}`}
                                                    >
                                                        <div className="button-wrapper-class-grid">
                                                            <button
                                                                onClick={() => handleButtonClick("all")}
                                                            >
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

                                    <IonCol size="6.5" className="class-game-names-percentage">
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
                                                        <p className="text-md-no-line-height semibold text-color-black">Cuentos</p>

                                                        <p className="text-color-grey">
                                                            Stories
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="3" style={{ textAlign: "center", }}>
                                                        <p>
                                                            {data[0]}%
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
                                                        <p className="text-md-no-line-height semibold text-color-black">Bienestar</p>
                                                        <p className="text-color-grey">
                                                            Wellness
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="3" style={{ textAlign: "center", }}>
                                                        <p>
                                                            {data[1]}%
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
                                                        <p className="text-md-no-line-height semibold text-color-black">Juego</p>

                                                        <p className="text-color-grey">
                                                            Play
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="3" style={{ textAlign: "center", }}>
                                                        <p>
                                                            {data[2]}%
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
                                                        <p className="text-md-no-line-height semibold text-color-black">Communidad</p>

                                                        <p className="text-color-grey">
                                                            Community
                                                        </p>
                                                    </IonCol>
                                                    <IonCol size="3" style={{ textAlign: "center", }}>
                                                        <p>
                                                            {data[3]}%
                                                        </p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>

                                        </IonRow>


                                    </IonCol>

                                    {/* graph columnn */}
                                    <IonCol size="5.5" className="class-graph-percentage">
                                        <PieChartComponent
                                            data={data}
                                            colors={['#0045A1', '#973D78', '#FF5708', '#22BEB9']}
                                            innRadius={3}
                                            width={200}
                                            height={205}
                                            cX={105}
                                            cY={85}
                                        />
                                    </IonCol >


                                </IonRow>

                            </IonCard>
                            {/* blog part */}
                            <IonCard className="card-blog">
                                <div className="class-overview-blog-styles">
                                    <IonGrid>
                                        <IonRow class="ion-align-items-center">
                                            <IonCol size="2.5">
                                                <img src={StudentsReadingPicture} alt="" />
                                            </IonCol>
                                            <IonCol>
                                                <p className="text-xl semibold text-color-black">Visit the Bili blog</p>
                                                <p>Explore resources and tips for <br />teaching multilingual students</p>
                                            </IonCol>
                                            <IonCol size="2.5">
                                                <button className="visit-blog-button">
                                                    <a
                                                        href="https://thebiliapp.com/blog/"
                                                        target="_blank"
                                                        rel="noopener noreferrer">
                                                        <p className="text-sm semibold">
                                                            Learn more
                                                        </p>
                                                    </a>
                                                </button>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>



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

                                <IonList lines="full" className="students-needs-support-list">
                                    {studentData.map((student, index) => (

                                        <IonItem key={index}>
                                            <div className="student-needs-support-picture">
                                                <img src={student.image} alt="" />
                                            </div>
                                            <div className="student-needs-support-text">
                                                <p className="student-needs-support-text-name">
                                                    {student.name}
                                                </p>
                                                <p className="student-needs-support-text-problem text-color-grey">
                                                    {student.exercise}
                                                </p>
                                            </div>
                                            <div className="student-needs-support-progress-bar">
                                                <div className="student-needs-support-progress-bar-percentage">
                                                    {Math.round(student.percentage * 100)}%
                                                </div>
                                                <IonProgressBar
                                                    value={student.percentage}
                                                    buffer={1}
                                                    style={{
                                                        '--background': student.percentage < 0.50 ? '#FFDAD2' : '#FFF3D3',
                                                        '--progress-background': student.percentage < 0.50 ? '#FF5708' : '#F1D100',

                                                    }}
                                                >

                                                </IonProgressBar>
                                            </div>
                                        </IonItem>
                                    ))}
                                </IonList>
                                <div className="review-word-styles">
                                    <IonGrid>
                                        <IonRow className="ion-align-items-center ion-justify-content-center">
                                            <IonCol size="1.1" >
                                                <span className="smaller-oval-element color-5">
                                                    <IonIcon icon={LightBulb}>
                                                    </IonIcon>
                                                </span>
                                            </IonCol>
                                            <IonCol>
                                                <p className="text-sm text-color-black">
                                                    Review word families again
                                                </p>
                                                <p className="text-xs text-color-grey">
                                                    Some students need help with this concept
                                                </p>
                                            </IonCol>
                                        </IonRow>

                                    </IonGrid>
                                </div>
                                <IonButton
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