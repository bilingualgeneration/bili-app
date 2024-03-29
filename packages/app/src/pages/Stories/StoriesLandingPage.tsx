import React, { FC } from "react";
import { Play } from "../Play";
import { useProfile } from "@/contexts/ProfileContext";
import { Carousel } from "@/components/Carousel";
import "./StoriesLandingPage.scss";
import { PackHeader } from "@/components/PackHeader";
import { ContentCard } from "@/components/ContentCard";
import comingSoonBlock from "@/assets/icons/coming_soon_block.svg";
import CatrinaCover from '@/assets/img/catrina.png';
import GustaCover from '@/assets/img/gusta.png';

import './StoriesLandingPage.scss';
import { PackSelect } from "@/components/PackSelect";

export const StoriesLandingPage: FC = () => {
    const { isImmersive, isInclusive } = useProfile();

    const storiesCards = [
        {
            category: "stories",
            title: isInclusive ? "¡Amigues!" : "¡Amigos!",
            titleEn: "Friends!",
            cover: "/assets/img/amigues_cover.png",
            link: "/stories/f2e347ac-50b0-4d59-b7f8-682e2659c22f",
            isLocked: false,
        },
        {
            category: "stories",
            title: "Cara de Catrina",
            titleEn: "Catrina for a Day",
            cover: CatrinaCover,
            link: "/stories/791c76d0-4835-4fcc-8c75-44a17c606be4",
            isLocked: false
        },
        {
            category: "stories",
            title: "¿Qué es lo que te gusta de ti?",
            titleEn: "What do you like about yourself?",
            cover: GustaCover,
            link: "/stories/ea4e21a7-ae7c-4ec7-9112-23e19e7a0932",
            isLocked: false,
        },
        {
            category: "stories",
            title: "El esqueleto travieso",
            titleEn: "The Mischievous Skeleton",
            cover: "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/4_cover_El_esqueleto_travieso_e992b9d069.svg",
            link: "/stories/944328dc-bf51-4af3-ba28-a97565a65a43",
            isLocked: false,
        },
      {
	category: "stories",
	title: "¡Me gusta!",
	titleEn: "I Like It!",
	cover: "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/Cover_Me_Gusta_fc5d6f6fec.png",
	link: "/stories/2dc82579-85a5-488e-8bc6-ab18cc349b3c",
	isLocked: false,
      },
      {
	category: "stories",
	title: "Mancha de plátano",
	titleEn: "Plantain Stain",
	cover: "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/mancha_Cover_fa80bfa1a7.png",
	link: "/stories/64578366-bf8d-4e58-813c-113f9c81fb66",
	isLocked: false,
      },
      {
	category: "stories",
	title: "Corazón contento",
	titleEn: "Happy Heart",
	cover: "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/Cover_Corazon_e769c63ee2.png",
	link: "/stories/7935ba4a-0800-49a5-8ce8-2f1d3ca0a906",
	isLocked: false,
      },    
    ];
  
    return (
        <>
            

            <div  id="stories-landing-page">
                {/* stories cards header + row */}
                {/* TEXT doesn't fit the whole PackSelect pattern */}
                {/* <div>
                    <h1 className="text-5xl bold carousel-header-margin all-about-me-header">Todo sobre mi </h1>
                    {!isImmersive && (
                        <h2 className="text-3xl color-english carousel-header-margin">All about me</h2>
                    )}
                </div> */}  
                
                <div className="margin-top-2 margin-bottom-3">

                    <PackSelect 
                        translatedTitle={"Cuentos"} 
                        englishTitle={"Stories"} 
                        category={"story"} 
                        module={"story"}  
                        pack_name_field = {"title"}          
                    />
                </div>

                {/* family and community header + row */}
                <div id="stories-landing-page">
                    <h1 className="text-5xl bold carousel-header-margin">Familia y comunidad </h1>
                    {!isImmersive && (
                        <h2 className="text-3xl color-english carousel-header-margin">Family and community</h2>
                    )}

                    <div className="image-container">
                        <img 
                            src={comingSoonBlock}
                            alt="Coming Soon Image"
                            className="margin-bottom-5 coming-soon-picture-margin"
                        />
                    </div>
                
                </div>

               
            </div>
        </>
    );
};

