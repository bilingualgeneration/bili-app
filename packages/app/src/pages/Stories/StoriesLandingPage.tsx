import React, { FC } from "react";
import { Play } from "../Play";
import { useProfile } from "@/contexts/ProfileContext";
import { Carousel } from "@/components/Carousel";
import "./StoriesLandingPage.scss";
import { PlayHeader } from "@/components/PlayHeader";
import { ContentCard } from "@/components/ContentCard";
import comingSoonBlock from "@/assets/icons/coming_soon_block.svg";
import CatrinaCover from '@/assets/img/catrina.png';
import GustaCover from '@/assets/img/gusta.png';

import './StoriesLandingPage.scss';

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
    ];

    return (
        <>
            <PlayHeader
                bannerColor="#006A67"
                title="Cuentos" 
                subtitle="Stories"
                titleClassName="text-5xl color-nube"
                subtitleClassName="text-3xl color-nube"
            />

            <div className="stories-landing-page-container" id="stories-landing-page">
                {/* stories cards header + row */}
                <div>
                    <h1 className="text-5xl bold carousel-header-margin all-about-me-header">Todo sobre mi </h1>
                    {!isImmersive && (
                        <h2 className="text-3xl color-english carousel-header-margin">All about me</h2>
                    )}
                </div>
                
                <div className="margin-top-2 margin-bottom-3">
                    <Carousel height={274}>
                        {storiesCards.map((c, index) => (
                            <ContentCard 
                              {...c}
			      fid={index.toString()}
                              key={index} 
                            />
                        ))}
                    </Carousel>
                </div>

                {/* family and community header + row */}
                <div id="stories-landing-page">
                    <h1 className="text-5xl bold carousel-header-margin">Familia y comunidad </h1>
                    {!isImmersive && (
                        <h2 className="text-3xl color-english carousel-header-margin">Family and community</h2>
                    )}
                </div>

                <img 
                    src={comingSoonBlock}
                    alt="Coming Soon Image"
                    className="margin-bottom-5"
                />
            </div>
        </>
    );
};

