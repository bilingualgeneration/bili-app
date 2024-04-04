import React, { FC } from "react";
import { Play } from "../Play";
import { useProfile } from "@/contexts/ProfileContext";
import { Carousel } from "@/components/Carousel";
import "./StoriesLandingPage.scss";
import comingSoonBlock from "@/assets/icons/coming_soon_block.svg";
import './StoriesLandingPage.scss';
import { PackSelect } from "@/components/PackSelect";

export const StoriesLandingPage: FC = () => {
    const { isImmersive, isInclusive } = useProfile();
  
    return (
        <>
            <div  id="stories-landing-page">
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

