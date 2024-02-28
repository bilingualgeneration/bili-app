import React, { FC } from "react";
import { Play } from "../Play";
import { useProfile } from "@/contexts/ProfileContext";
import { Carousel } from "@/components/Carousel";
import "./StoriesLandingPage.scss";
import { PlayHeader } from "@/components/PlayHeader";

export const StoriesLandingPage: FC = () => {
    return (
        <>
            <PlayHeader
                bannerColor="#FFF8F0"
                title="Mi Perfil - Próximamente" 
                subtitle="My Profile - Coming Soon!"
                titleClassName="text-5xl color-suelo"
                subtitleClassName="text-3xl color-english semibold"
            />
        </>
    );
};

